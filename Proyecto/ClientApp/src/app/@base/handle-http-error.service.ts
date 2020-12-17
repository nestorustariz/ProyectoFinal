import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(private modalService: NgbModal) { }

  public handleError<T>(operation = 'operation', result?:T)
  {
    return (error: any): Observable<T> => {
      if (error.status == "400") {
        this.error400(error);
      }
      return of(result as T);
    };
  }

  public log(message:string)
  {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = 'Mensaje';
    modalRef.componentInstance.message = (`${message}`);
    return Promise.resolve();
  }

  public error400(error: any): void {
    let validaciones: number = 0;
    let mensaje: string = `Señor(a) Usuario(a), error de validacion, por favor reviselos e intente nuevamente.<br/><br/>`;

    for (const prop in error.error.errors) {
      validaciones++;
      mensaje += `<strong>${validaciones}.${prop}:</strong>`;

      error.error.errors[prop].forEach(element => {
        mensaje += `<br/> - ${element}`;
      });

      mensaje += `<br/>`;
    }
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = 'Mensaje de Error';
    modalRef.componentInstance.message = mensaje;

  }
}
