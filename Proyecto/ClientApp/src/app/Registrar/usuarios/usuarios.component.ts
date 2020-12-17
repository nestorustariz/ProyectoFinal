import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,private modalService:NgbModal,private formBuilder:FormBuilder) { }
  registerForm:FormGroup;
  usuario:Usuario;
  submitted=false;
  usuarios:Usuario[];

  ngOnInit() {
    this.buildForm();
    this.getUsuarios();
  }

  private buildForm(){
    this.usuario = new Usuario();
    this.registerForm = this.formBuilder.group({
      identificacion:[this.usuario.identificacion,Validators.required],
      nombre:[this.usuario.nombre,Validators.required],
      apellido:[this.usuario.apellido,Validators.required],
      correo:[this.usuario.correo,Validators.required],
      tipo:[this.usuario.tipo,Validators.required],
      password:[this.usuario.password,Validators.required],
      userName:[this.usuario.userName,Validators.required]
    });
  }

  get control(){
    return this.registerForm.controls;
  }

  add(){
    this.usuario = this.registerForm.value;
    this.usuarioService.registrarUsuario(this.usuario).subscribe(p => {
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

  getUsuarios(){
    this.usuarioService.consultarUsuarios().subscribe(result => {
      this.usuarios = result;
    });
  }

}
