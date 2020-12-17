import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { promise } from 'protractor';
import { ModalAsignaturaComponent } from 'src/app/modal/modal-asignatura/modal-asignatura.component';
import { Asignatura } from 'src/app/models/asignatura';
import { Docente } from 'src/app/models/docente';
import { SignalRService } from 'src/app/services/signal-r.service';
import { DocenteView } from '../../../models/docente-view';
import { DocenteService } from '../../../services/docente.service';

@Component({
  selector: 'app-docente-register',
  templateUrl: './docente-register.component.html',
  styleUrls: ['./docente-register.component.css']
})
export class DocenteRegisterComponent implements OnInit {

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private docenteService: DocenteService,
    private signalRService: SignalRService) { }

  registerForm:FormGroup;
  docente: Docente;
  docentes: Docente[];
  submitted=false;
  searchText = "";
  ngOnInit() {

    this.docente = new Docente();

    this.registerForm = this.formBuilder.group({
      identificacion:[this.docente.identificacion, Validators.required],
      nombre:[this.docente.nombre, Validators.required],
      apellido:[this.docente.apellido, Validators.required],
      programa:[this.docente.programa,Validators.required],
      searchText:['']
    });

    this.getAllDocentes();
    
    this.signalRService.docenteReceived.subscribe((docente: Docente) => {
      this.docentes.push(docente);
    });
  }

  openModalAsignaturas()
  {
    this.modalService.open(ModalAsignaturaComponent).result.then((asignatura) => this.mostrarAsignatura(asignatura));
  }

  mostrarAsignatura(asignatura:Asignatura)
  {
    this.registerForm.controls['codAsignatura'].setValue(asignatura.codAsignatura);
    this.registerForm.controls['nombreAsignatura'].setValue(asignatura.nombreAsignatura);
  }

  create()
  {
    this.docente = this.registerForm.value;
    this.docenteService.registrarDocente(this.docente).subscribe(p => {
      if (p != null) {
        this.onReset();    
      }
    });
    return Promise.resolve();
  }

  onSubmit()
  {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.create().then((result) => {
      this.getAllDocentes();
    });
  }

  get control() { 
    return this.registerForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  getAllDocentes() {
    this.docenteService.consultarDocentes().subscribe(result => {
      this.docentes = result;
    })
  }
}
