import { Roles } from './../../Modelo/Roles';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Usuario } from './../../Modelo/Usuario';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private router:Router, private service:ServiceService, private fb:FormBuilder) { }

  Usuarios:Usuario = new Usuario();
  formAdd!:FormGroup;
  ocupado!: Usuario;
  roles!:Roles[];
  idGlo!:String;

  ngOnInit(): void {
    let id = localStorage.getItem("id");

    if(id == null) {
      id = "0";
    } else {
      this.idGlo = id;
    }

    this.InicializarInfo();
    this.Roles();
    this.formAdd = this.fb.group({
      id:new FormControl(''),
      nombre:new FormControl(''),
      rol:new FormControl(''),
      activo:new FormControl('')
    });
  }

  InicializarInfo() {
    this.service.getUsuariosId(+this.idGlo)
    .subscribe(data => {
      this.Usuarios = data;
      this.formAdd.get("rol")?.setValue(this.Usuarios.id_rol);
    });
  }

  ActualizarInfo():void {
    localStorage.setItem("id",this.idGlo.toString());
    this.router.navigate(["editar"]);
  }

  Roles() {
    this.service.getRoles()
    .subscribe(data => {
      this.roles = data
    });
  }

  Eliminar(Usuario:Usuario) {
    this.service.eliminarUsuario(Usuario)
    .subscribe(data => {
      this.router.navigate(["listar"])
    });
  }
}
