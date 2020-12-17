import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Producto } from '../models/producto';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseUrl:string;
  constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string,private handleError:HandleHttpErrorService) { this.baseUrl = baseUrl}

  registrar(producto:Producto):Observable<Producto>
  {
    return this.http.post<Producto>(this.baseUrl + 'api/Producto',producto,httpOptions).pipe(
      tap((productoNew : Producto) => this.handleError.log(`Registrado el producto con Codigo: ${productoNew.codProducto} `)),
      catchError(this.handleError.handleError<Producto>('Producto Registrada'))
    );
  }

  consultarProductos(): Observable<Producto[]>
  {
    return this.http.get<Producto[]>(this.baseUrl + 'api/Producto').pipe(
      catchError(this.handleError.handleError<Producto[]>('Consulta Productos', []))
    );
  }
}
