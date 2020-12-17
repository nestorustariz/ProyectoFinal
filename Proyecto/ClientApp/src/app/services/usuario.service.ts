import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Usuario } from '../models/usuario';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private handleError: HandleHttpErrorService) {this.baseUrl = baseUrl }

  registrarUsuario(usuario: Usuario): Observable<Usuario>
  {
    let user:Observable<Usuario> = this.http.post<Usuario>(this.baseUrl + 'api/User', usuario, httpOptions).pipe(
      tap((usuarioNew: Usuario) => this.handleError.log(`Registrado el usuario con identificacion: ${usuarioNew.identificacion} `)),
      catchError(this.handleError.handleError<Usuario>('Error al registrar'))
    );
    return user;
  }

  consultarUsuarios(): Observable<Usuario[]>
  {
    return this.http.get<Usuario[]>(this.baseUrl + 'api/User').pipe(
      catchError(this.handleError.handleError<Usuario[]>('Consulta Usuarios', []))
    );
  }
}
