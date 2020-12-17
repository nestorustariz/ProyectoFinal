import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Asignatura } from '../models/asignatura';
import { AsignaturaView } from '../models/asignatura-view';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  baseUrl:string;
  constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string,private handleError:HandleHttpErrorService) {this.baseUrl = baseUrl }

  registrar(asignatura:Asignatura):Observable<Asignatura>
  {
    return this.http.post<Asignatura>(this.baseUrl + 'api/Asignatura',asignatura,httpOptions).pipe(
      tap((asignaNew : Asignatura) => this.handleError.log(`Registrada la asignatura con Codigo: ${asignaNew.codAsignatura} `)),
      catchError(this.handleError.handleError<Asignatura>('Asignatura Registrada'))
    );
  }

  consultar():Observable<AsignaturaView[]>
  {
    return this.http.get<AsignaturaView[]>(this.baseUrl + 'api/Asignatura').pipe(
      catchError(this.handleError.handleError<AsignaturaView[]>('Consulta asignaturas',[]))
    );
  }

  consultarByIdDocente(identificacionD:string):Observable<AsignaturaView[]>
  {
    return this.http.get<AsignaturaView[]>(this.baseUrl + 'api/Asignatura/' + identificacionD).pipe(
      catchError(this.handleError.handleError<AsignaturaView[]>('Consulta asignaturas',[]))
    );
  }
}
