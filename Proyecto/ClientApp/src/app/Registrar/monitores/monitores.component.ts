import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Monitor } from 'src/app/models/monitor';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.component.html',
  styleUrls: ['./monitores.component.css']
})
export class MonitoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private monitorService:MonitorService) { }

  registerForm:FormGroup;
  monitor:Monitor;
  monitores:Monitor[];
  submitted=false;
  searchText = "";
  ngOnInit() {

    this.monitor = new Monitor();

    this.registerForm = this.formBuilder.group({
      identificacion:[this.monitor.identificacion, Validators.required],
      nombre:[this.monitor.nombre, Validators.required],
      apellido:[this.monitor.apellido, Validators.required],
      programa:[this.monitor.programa,Validators.required],
      sexo:[this.monitor.sexo,Validators.required],
      celular:[this.monitor.celular,Validators.maxLength(10)],
      searchText:['']
    });

    this.getAllMonitores();
  }

  getAllMonitores() {
    this.monitorService.consultarMonitor().subscribe(result => {
      this.monitores = result;
    })
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  get control() { 
    return this.registerForm.controls;
  }

  onSubmit()
  {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.create();
    this.getAllMonitores();
  }

  create()
  {
    this.monitor = this.registerForm.value;
    this.monitorService.registrarMonitor(this.monitor).subscribe(p => {
      if (p != null) {
        this.onReset();    
      }
    });
  }
}
