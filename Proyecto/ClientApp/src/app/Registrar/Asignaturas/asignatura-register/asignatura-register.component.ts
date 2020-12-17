import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,AbstractControl} from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Asignatura } from 'src/app/models/asignatura';
import { AsignaturaView } from 'src/app/models/asignatura-view';
import { AsignaturaService } from 'src/app/services/asignatura.service';

@Component({
  selector: 'app-asignatura-register',
  templateUrl: './asignatura-register.component.html',
  styleUrls: ['./asignatura-register.component.css']
})
export class AsignaturaRegisterComponent implements OnInit {
  registerForm:FormGroup;
  submitted = false;
  asignatura:Asignatura;
  asignaturas:AsignaturaView[];
  searchText = "";
  constructor(private formBuilder:FormBuilder,private asignaturaService:AsignaturaService,private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
    this.getAll();
  }
  private buildForm()
  {
    this.asignatura = new Asignatura();
    this.asignatura.codAsignatura = '';  
    this.asignatura.nombreAsignatura = '';
    this.registerForm = this.formBuilder.group({
      codAsignatura: [this.asignatura.codAsignatura, Validators.required],
      nombreAsignatura: [this.asignatura.nombreAsignatura,Validators.required],
      identificacionD: [this.asignatura.identificacionD,Validators.required],
      searchText:['']
    });
  }

  get control() { 
    return this.registerForm.controls;
  }
    

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.add();
  }

  add(){
    this.asignatura = this.registerForm.value;
    this.asignaturaService.registrar(this.asignatura).subscribe(p => {
      if (p != null) {
        this.onReset();
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  getAll()
  {
    this.asignaturaService.consultar().subscribe(result => {
      this.asignaturas = result;
    });
  }
}
