import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthMonitorGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService,private modalService:NgbModal){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser.tipo == "monitor" || currentUser.tipo == "admin"){
      return true;
    }
    const modalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.title = 'Acceso Denegado';
        modalRef.componentInstance.message = 'No tienes permiso para esta accion';
    return true;
  }
  
}
