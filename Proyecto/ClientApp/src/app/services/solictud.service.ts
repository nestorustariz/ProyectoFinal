import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { SolicitudView } from '../models/solicitud-view';
import { Solictud } from '../models/solictud';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SolictudService {

  baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private handleError: HandleHttpErrorService) {this.baseUrl = baseUrl }

  registrarDocente(solicitud: Solictud): Observable<Solictud>
  {
    let docen:Observable<Solictud> = this.http.post<Solictud>(this.baseUrl + 'api/Solicitud', solicitud, httpOptions).pipe(
      tap((solictudNew: Solictud) => this.handleError.log(`Registrada la solictud con codigo: ${solictudNew.codigoSolicitud} `).then((result) => {
        return window.location.reload();
      })),
      catchError(this.handleError.handleError<Solictud>('Error al registrar'))
    );
    return docen;
  }

  consultar():Observable<SolicitudView[]>
  {
    return this.http.get<SolicitudView[]>(this.baseUrl + 'api/Solicitud').pipe(
      catchError(this.handleError.handleError<SolicitudView[]>('Consulta solicitudes',[]))
    );
  }

  consultarByIdMonitor(identificacionM:string):Observable<SolicitudView[]>
  {
    return this.http.get<SolicitudView[]>(this.baseUrl + 'api/Solicitud/' + identificacionM).pipe(
      catchError(this.handleError.handleError<SolicitudView[]>('Consulta solicitudes',[]))
    );
  }

  consultarById(codigoSolicitud:number):Observable<SolicitudView>
  {
    return this.http.get<SolicitudView>(this.baseUrl + 'api/Solicitud/SolicitudesById/' + codigoSolicitud).pipe(
      catchError(this.handleError.handleError<SolicitudView>('Consulta solicitudes',null))
    );
  }

  modificarSolicitud(solicitud: Solictud): Observable<Solictud>
  {
    let docen:Observable<Solictud> = this.http.put<Solictud>(this.baseUrl + 'api/Solicitud', solicitud, httpOptions).pipe(
      tap((solictudNew: Solictud) => this.handleError.log(`Modificada la solictud con codigo: ${solictudNew.codigoSolicitud} `).then((result) => {
        return window.location.reload();
      })),
      catchError(this.handleError.handleError<Solictud>('Error al modificar'))
    );
    return docen;
  }
}
