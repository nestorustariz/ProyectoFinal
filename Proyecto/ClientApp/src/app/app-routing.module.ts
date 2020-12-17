import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturaRegisterComponent } from './Registrar/Asignaturas/asignatura-register/asignatura-register.component';
import { DocenteRegisterComponent } from './Registrar/Docentes/docente-register/docente-register.component';
import { ProductosRegisterComponent } from './Productos/productos-register/productos-register.component';
import { ProductosConsultaComponent } from './Productos/productos-consulta/productos-consulta.component';
import { SolicitarComponent } from './Solicitudes/solicitar/solicitar.component';
import { SolicitudesComponent } from './Solicitudes/solicitudes/solicitudes.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MonitoresComponent } from './Registrar/monitores/monitores.component';
import { UsuariosComponent } from './Registrar/usuarios/usuarios.component';
import { AuthDocenteGuard } from './services/auth-docente.guard';
import { AuthMonitorGuard } from './services/auth-monitor.guard';
import { SolicitudesByIdComponent } from './Solicitudes/solicitudes-by-id/solicitudes-by-id.component';

const routes:Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'asignaturasAdd',
    component:AsignaturaRegisterComponent, canActivate:[AuthGuard]
  },
  {
    path:'docentesAdd',
    component:DocenteRegisterComponent, canActivate:[AuthGuard]
  },
  {
    path:'productosAdd',
    component:ProductosRegisterComponent, canActivate:[AuthGuard]
  },
  {
    path:'productosList',
    component:ProductosConsultaComponent, canActivate:[AuthGuard]
  },
  {
    path:'solicitar',
    component:SolicitarComponent, canActivate:[AuthDocenteGuard]
  },
  {
    path:'solicitudes',
    component:SolicitudesComponent, canActivate:[AuthGuard,AuthMonitorGuard]
  },
  {
    path:'monitores',
    component:MonitoresComponent, canActivate:[AuthGuard]
  },
  {
    path:'usuarios',
    component:UsuariosComponent, canActivate:[AuthGuard]
  },
  {
    path:'solicitud/:codigoSolicitud',
    component:SolicitudesByIdComponent, canActivate:[AuthGuard,AuthMonitorGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
