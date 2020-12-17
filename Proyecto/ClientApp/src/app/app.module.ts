import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeadersComponent } from './Components/headers/headers.component';
import { MenuComponent } from './Components/menu/menu.component';
import { ContentComponent } from './Components/content/content.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AsignaturaRegisterComponent } from './Registrar/Asignaturas/asignatura-register/asignatura-register.component';
import { DocenteRegisterComponent } from './Registrar/Docentes/docente-register/docente-register.component';
import { ProductosRegisterComponent } from './Productos/productos-register/productos-register.component';
import { ProductosConsultaComponent } from './Productos/productos-consulta/productos-consulta.component';
import { SolicitarComponent } from './Solicitudes/solicitar/solicitar.component';
import { SolicitudesComponent } from './Solicitudes/solicitudes/solicitudes.component';
import { AsignaturasComponent } from './lists/asignaturas/asignaturas.component';
import { ModalAsignaturaComponent } from './modal/modal-asignatura/modal-asignatura.component';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { LoginComponent } from './login/login/login.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { UsuariosComponent } from './Registrar/usuarios/usuarios.component';
import { MonitoresComponent } from './Registrar/monitores/monitores.component';
import { SolicitudesByIdComponent } from './Solicitudes/solicitudes-by-id/solicitudes-by-id.component';
import { FiltroDocentePipe } from './pipe/filtro-docente.pipe';
import { FiltroAsignaturaPipe } from './pipe/filtro-asignatura.pipe';
import { FiltroMonitoresPipe } from './pipe/filtro-monitores.pipe';
import { FiltroProductosPipe } from './pipe/filtro-productos.pipe';
import { FiltroProductoCategoriaPipe } from './pipe/filtro-producto-categoria.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HeadersComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    AsignaturaRegisterComponent,
    DocenteRegisterComponent,
    ProductosRegisterComponent,
    ProductosConsultaComponent,
    SolicitarComponent,
    SolicitudesComponent,
    AsignaturasComponent,
    ModalAsignaturaComponent,
    AlertModalComponent,
    LoginComponent,
    UsuariosComponent,
    MonitoresComponent,
    SolicitudesByIdComponent,
    FiltroDocentePipe,
    FiltroAsignaturaPipe,
    FiltroMonitoresPipe,
    FiltroProductosPipe,
    FiltroProductoCategoriaPipe
  ],
  imports: [
    ReactiveFormsModule,
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([

    ]),
    AppRoutingModule
  ],
  entryComponents:[
    ModalAsignaturaComponent,
    AlertModalComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
