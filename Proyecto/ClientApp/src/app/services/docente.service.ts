import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { DocenteView } from '../models/docente-view';
import { tap, catchError } from 'rxjs/operators';
import { Docente } from '../models/docente';
import { promise } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  baseUrl: string;
  docentes: Observable<DocenteView[]>;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private handleError: HandleHttpErrorService) { this.baseUrl = baseUrl }


  consultarDocentes(): Observable<Docente[]>
  {
    return this.http.get<Docente[]>(this.baseUrl + 'api/Docente').pipe(
      catchError(this.handleError.handleError<Docente[]>('Consulta Docentes', []))
    );
  }

  registrarDocente(docente: Docente): Observable<Docente>
  {
    let docen:Observable<Docente> = this.http.post<Docente>(this.baseUrl + 'api/Docente', docente, httpOptions).pipe(
      tap((docenteNew: Docente) => this.handleError.log(`Registrado el docente con identificacion: ${docenteNew.identificacion} `)),
      catchError(this.handleError.handleError<Docente>('Error al registrar'))
    );
    return docen;
  }

  contar():number{
    let total:number;
    for (let index = 0; index < this.consultarDocentes().subscribe.length; index++) {
      total = parseInt(total.toString()) + 1;
    }
    return total;
  }
}
