import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asignatura } from 'src/app/models/asignatura';
import { AsignaturaView } from 'src/app/models/asignatura-view';
import { Producto } from 'src/app/models/producto';
import { Solictud } from 'src/app/models/solictud';
import { Usuario } from 'src/app/models/usuario';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SolictudService } from 'src/app/services/solictud.service';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {
  @ViewChild("divProductos", {static: false}) div: ElementRef;
  contador = -1;
  productos:Producto[];
  producto:Producto;
  asignaturasV:AsignaturaView[];
  solicitud:Solictud;
  asignaturasC :AsignaturaView[];
  instructions = [];
  instructions2 = [];
 
  currentUser:Usuario;
  constructor(private formBuilder: FormBuilder,private productosService:ProductoService,private renderer: Renderer2,
    private solictudService:SolictudService,private authenticationService:AuthenticationService,private asignaturaService:AsignaturaService)
  {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x);
  }
  registerForm:FormGroup;
  submitted=false;
  ngOnInit() {
    
    this.solicitud = new Solictud();

    this.registerForm = this.formBuilder.group({
      codigo:[''],
      identificacionM:[this.solicitud.identificacionM, Validators.required],
      fechaPedido:[this.solicitud.fechaPedido, Validators.required],
      fechaEntrega:[this.solicitud.fechaEntrega,Validators.required],
      nombreAsignatura:[''],
      codAsignatura:[this.solicitud.codAsignatura,Validators.required],
      divElim:['']
    });
    this.getAll();   
    // this.getAsignaturas();
    this.cargarAsignaturasByIdDocente();
  }


  get control() { 
    return this.registerForm.controls;
  }

  addSolictud(){
    
    this.solicitud = this.registerForm.value;   
    this.solicitud.jsonProductos = JSON.stringify(this.add()); 
    this.solictudService.registrarDocente(this.solicitud).subscribe(p => {
      if (p != null) {
        this.onReset();
      }
    });
    this.instructions = null;
  }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.addSolictud();
    
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  public add() : string[]{
    for (let index = 0; index <= this.contador; index++) {
      let temp = {
        cod:(<HTMLInputElement> document.getElementById('select_'+index)).value,
        cant:(<HTMLInputElement> document.getElementById('cantidad_'+index)).value
      }
      this.instructions.push(temp); 
    }
    
    return this.instructions;
  }

  getAll()
  {
    this.productosService.consultarProductos().subscribe(result => {
      this.productos = result;
      this.dibujar();
    });
  }

  dibujar(){
    
    let longMax = this.productos.length;
    this.contador += 1;
    const p: HTMLParagraphElement = this.renderer.createElement("div");
    if (this.contador >= longMax) {
      alert("No se pueden agregar mas productos")
    }else{
      
     p.innerHTML +=
      `<div class="row">
        <div class="col-md-6">
          <label>Nombre producto</label>
          <select id="select_${this.contador}" class="form-control"></select>
        </div>
        <div class="col-md-6">
          <label>Cantidad</label>
          <input formControlName="nombreAsignatura"  id="cantidad_${this.contador}" class="form-control">
        </div>
      </div>`          
         
    }
    this.renderer.appendChild(this.div.nativeElement, p);
    this.cargarSelect(this.contador);
  }

  cargarSelect(id:number) {
    if (id < this.productos.length) {
      var HtmlActividad = "";
      HtmlActividad += `<option value='' >Seleccionar</option>`;
      this.productos.forEach(element => {
        HtmlActividad += "<option value=" + element.descripcion + " >" + element.descripcion + "</option>";
      });
      document.getElementById('select_'+id).innerHTML = HtmlActividad;
    }
   
  }

  limpiar(){
    document.getElementById('divProductos').innerHTML = '';
  }

  // getAsignaturas(){
  //   this.productosService.consultarProductos().subscribe(result => {
  //     this.asignaturasV = result;
  //   })
  // }

  cargarAsignaturasByIdDocente(){
    let identificacion = this.currentUser.identificacion;
    this.asignaturaService.consultarByIdDocente(identificacion).subscribe(result => {
      this.asignaturasC = result;
    });
  }

}
