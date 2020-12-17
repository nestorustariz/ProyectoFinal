import { Component, OnInit } from '@angular/core';
import { SolicitudView } from 'src/app/models/solicitud-view';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SolictudService } from 'src/app/services/solictud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  solicitudes:SolicitudView[];
  currentUser:Usuario;
  solicitudesC :SolicitudView[];
  constructor(private solictudService:SolictudService,private authenticationService:AuthenticationService) 
  {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x);
  }

  ngOnInit() {
    if (this.currentUser.tipo == "admin") {
      this.getSolicitudes();
    }
    if (this.currentUser.tipo == "monitor") {
      this.cargarAsignaturasByIdDocente();
    }
    
  }

  getSolicitudes(){
    this.solictudService.consultar().subscribe(result =>{
      this.solicitudesC = result;
    });
  }

  cargarAsignaturasByIdDocente(){
    let identificacion = this.currentUser.identificacion;
    this.solictudService.consultarByIdMonitor(identificacion).subscribe(result => {
      this.solicitudesC = result;
    });
  }
}
