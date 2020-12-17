import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Asignatura } from 'src/app/models/asignatura';

@Component({
  selector: 'app-modal-asignatura',
  templateUrl: './modal-asignatura.component.html',
  styleUrls: ['./modal-asignatura.component.css']
})
export class ModalAsignaturaComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

  actualizar(asignatura:Asignatura)
  {
    this.activeModal.close(asignatura);
  }

}
