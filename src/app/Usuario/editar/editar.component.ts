import { Roles } from './../../Modelo/Roles';
import { Router } from '@angular/router';
import { ServiceService } from './../../Service/service.service';
import { Usuario } from 'src/app/Modelo/Usuario';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private router:Router, private service:ServiceService, private fb:FormBuilder) { }

  Usuarios:Usuario = new Usuario();
  formAdd!:FormGroup;
  ocupado!: Usuario;
  roles!:Roles[];
  idGlo!:String;
  nomTemp!:String;

  ngOnInit(): void {
    this.Roles();
    this.Editar();
    this.formAdd = this.fb.group({
      id:new FormControl('',[Validators.required]),
      nombre:new FormControl('',[Validators.required]),
      rol:new FormControl('',[Validators.required]),
      activo:new FormControl('',[Validators.required])
    });
  }

  async Editar() {
    let id = localStorage.getItem("id");

    if(id == null) {
      id = "0";
    }

    this.Usuarios = await this.service.getUsuariosId(+id).toPromise();

    this.formAdd.get("id")?.setValue(this.Usuarios.id_usuario);
    this.formAdd.get("nombre")?.setValue(this.Usuarios.nombre);
    this.formAdd.get("rol")?.setValue(this.Usuarios.id_rol);
    this.formAdd.get("activo")?.setValue(this.Usuarios.activo);

    this.nomTemp = this.Usuarios.nombre;
  }

  Actualizar(usuarios:Usuario) {
    this.Usuarios.nombre = this.formAdd.value.nombre;
    this.Usuarios.id_rol = this.formAdd.value.rol;
    this.Usuarios.activo = this.formAdd.value.activo;

    this.service.getUsuariosUserName(this.Usuarios)
    .subscribe(data => {
      this.ocupado = data
      if(this.ocupado == null || this.nomTemp == this.Usuarios.nombre) {
        this.ActualizarConfirmado(usuarios);
      } else {
        alert("El nombre de usuario " + this.Usuarios.nombre + " ya se encuentra en uso")
      }
    });;
  }

  ActualizarConfirmado(Usuarios:Usuario) {
    this.service.editarUsuario(Usuarios)
    .subscribe(data => {
      this.Usuarios = data
      this.service.getUsuarios()
        .subscribe(data => {
          this.Usuarios = data
        });
      this.router.navigate(["listar"]);
    });
  }

  async Roles() {
    this.roles = await this.service.getRoles().toPromise();
  }
}
