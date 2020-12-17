import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-register',
  templateUrl: './productos-register.component.html',
  styleUrls: ['./productos-register.component.css']
})
export class ProductosRegisterComponent implements OnInit {

  registerForm:FormGroup;
  submitted=false;
  producto:Producto;
  constructor(
    private formBuilder:FormBuilder,
    private productoService:ProductoService,
    private modalService:NgbModal) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(){
    this.producto = new Producto();
    this.registerForm = this.formBuilder.group({
      codProducto: [this.producto.codProducto, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required],
      marca: [this.producto.marca, Validators.required],
      categoria: [this.producto.categoria, Validators.required],
      cantidad: [this.producto.cantidad, Validators.required],
    });
  }

  get control() { 
    return this.registerForm.controls;
  }

  add(){
    this.producto = this.registerForm.value;
    this.productoService.registrar(this.producto).subscribe(p => {
      if (p != null) {
        this.onReset();
      }
    })
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
    this.add();
  }

}
