import { Roles } from './../../Modelo/Roles';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  Usuarios!:Usuario[];
  roles!:Roles[];
  constructor(private service:ServiceService, private router:Router) { }

  filterUsuario = '';

  ngOnInit() {
    this.filterUsuario = '';
    this.service.getUsuarios()
    .subscribe(data => {
      this.Usuarios = data
    });
  }

  Nuevo() {
    this.router.navigate(["add"]);
  }

  Editar(Usuario:Usuario):void {
    localStorage.setItem("id",Usuario.id_usuario.toString());
    this.router.navigate(["editar"]);
  }

  VisualizarForm(Usuario:Usuario):void {
    localStorage.setItem("id",Usuario.id_usuario.toString());
    this.router.navigate(["formulario"]);
  }

  Eliminar(Usuario:Usuario) {
    this.service.eliminarUsuario(Usuario)
    .subscribe(data => {
      this.service.getUsuarios()
        .subscribe(data => {
          this.Usuarios = data
        });
      this.router.navigate(["listar"])
    });
  }

  LimpiarCampo() {
    this.filterUsuario = '';
  }

  BuscarNombre() {
    if(this.filterUsuario == '') {
      this.service.getUsuarios()
      .subscribe(data => {
        this.Usuarios = data
      });
    } else {
      this.service.getBuscarUserNombre(this.filterUsuario)
      .subscribe(data => {
        this.Usuarios = data
      });
    }
  }

  Roles() {
    this.service.getRoles()
    .subscribe(data => {
      this.roles = data
    });
  }
}
