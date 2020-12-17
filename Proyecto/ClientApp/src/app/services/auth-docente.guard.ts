import { Injectable } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDocenteGuard implements CanActivate {

  constructor(private router:Router,private authenticationService:AuthenticationService,private modalService:NgbModal){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser.tipo == "docente"){
      return true;
    }
    const modalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.title = 'Acceso Denegado';
        modalRef.componentInstance.message = 'No tienes permiso para esta accion';
    return false;
  }
  
}
