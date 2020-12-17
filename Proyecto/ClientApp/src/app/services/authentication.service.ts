import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject : BehaviorSubject<Usuario>;
  currentUser : Observable<Usuario>;
  baseUrl: string;

  constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string,private handleErrorService: HandleHttpErrorService)
  {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = baseUrl;
  }

  public get currentUserValue():Usuario{
    return this.currentUserSubject.value;
  }

  login(userName,password){
    return this.http.post<any>(`${this.baseUrl}api/Login`, {userName,password}).pipe(map(user => {
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
