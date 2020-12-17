import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Monitor } from '../models/monitor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private handleError: HandleHttpErrorService) {this.baseUrl = baseUrl }

  registrarMonitor(monitor: Monitor): Observable<Monitor>
  {
    let monit:Observable<Monitor> = this.http.post<Monitor>(this.baseUrl + 'api/Monitor', monitor, httpOptions).pipe(
      tap((monitorNew: Monitor) => this.handleError.log(`Registrado el monitor con identificacion: ${monitorNew.identificacion} `)),
      catchError(this.handleError.handleError<Monitor>('Error al registrar'))
    );
    return monit;
  }

  consultarMonitor(): Observable<Monitor[]>
  {
    return this.http.get<Monitor[]>(this.baseUrl + 'api/Monitor').pipe(
      catchError(this.handleError.handleError<Monitor[]>('Consulta Monitores', []))
    );
  }
}
