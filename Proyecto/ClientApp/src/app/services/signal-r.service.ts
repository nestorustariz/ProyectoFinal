import { EventEmitter, Inject, Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Docente } from '../models/docente';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  docenteReceived = new EventEmitter<Docente>();
  baseUrl: string;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + "signalHub") //use your api adress here and make sure you use right hub name.
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        //if you get error try to start connection again after 3 seconds.
        setTimeout(function () {
          this.startConnection();
        }, 3000);
      });
  };

  registerSignalEvents() {
    this.hubConnection.on("RegistrarDocente", (data: Docente) => {
      this.docenteReceived.emit(data);
    });
  }
}
