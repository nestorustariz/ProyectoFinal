import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SolicitudView } from 'src/app/models/solicitud-view';
import { Solictud } from 'src/app/models/solictud';
import { SolictudService } from 'src/app/services/solictud.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-solicitudes-by-id',
  templateUrl: './solicitudes-by-id.component.html',
  styleUrls: ['./solicitudes-by-id.component.css']
})
export class SolicitudesByIdComponent implements OnInit {

  constructor(private route:ActivatedRoute,private solicitudService:SolictudService,private formBuilder: FormBuilder,private location : Location) { }
  numero:number;
  registerForm:FormGroup;
  solicitud:SolicitudView;
  solicitar:Solictud;
  stringJson: any;
  submitted = false;
  ngOnInit() {
    this.solicitud = new SolicitudView();
    this.get();
    this.registerForm = this.formBuilder.group({
      estado: [this.solicitud.estado, Validators.required],
      fechaEntrega: [this.solicitud.fechaEntrega, Validators.required],
      fechaPedido: [this.solicitud.fechaPedido, Validators.required],
      identificacionM: [''],
      codigoSolicitud: [''],
      jsonProductos: [''],
      nombreAsignatura: [this.solicitud.nombreAsignatura, [ Validators.required]],
      nombreD: [this.solicitud.nombreD, Validators.required],
      identificacionD: [this.solicitud.identificacionD, [Validators.required]],
    });
  }

  get(): void{
    const id = +this.route.snapshot.paramMap.get('codigoSolicitud');
    this.solicitudService.consultarById(id).subscribe(solicitud=> {
      this.registerForm.controls['estado'].setValue(solicitud.estado);
      this.registerForm.controls['fechaEntrega'].setValue(solicitud.fechaEntrega.split("T")[0]);     
      this.registerForm.controls['fechaPedido'].setValue(solicitud.fechaPedido.split("T")[0]);  
      this.registerForm.controls['identificacionM'].setValue(solicitud.identificacionM);
      this.registerForm.controls['codigoSolicitud'].setValue(solicitud.codigoSolicitud);
      this.registerForm.controls['nombreAsignatura'].setValue(solicitud.nombreAsignatura);
      this.registerForm.controls['nombreD'].setValue(solicitud.nombreD);
      this.registerForm.controls['identificacionD'].setValue(solicitud.identificacionD);

      this.stringJson = JSON.parse(solicitud.jsonProductos);
      let res = document.querySelector('#res');
      res.innerHTML = '';
      for(let item of this.stringJson){
        res.innerHTML += `
          <tr style="text-align: center;">
              <td>${item.cod}</td>
              <td>${item.cant}</td>
          </tr>
        `
      }  
    } );
  }

  get control() { 
    return this.registerForm.controls;
  }

  update(){
    this.solicitar = this.registerForm.value;
    this.solicitudService.modificarSolicitud(this.solicitar).subscribe(() => 
      this.onReset()
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.update();
  }


}
