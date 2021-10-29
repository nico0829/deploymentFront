import { Roles } from './../../Modelo/Roles';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ServiceService } from 'src/app/Service/service.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  UsuarioGuardar!:Usuario;
  ocupado!: Usuario;
  validador!:Boolean;
  formAdd!:FormGroup;
  roles!:Roles[];

  constructor(private service:ServiceService, private router:Router, private fb:FormBuilder) { }
  //Cuando se adiciona como parámetro en un constructor se dice que está inyectando algo

  ngOnInit(): void {
    this.Roles();
    this.validador = true;
    this.formAdd = this.fb.group({
      nombre:new FormControl('',[Validators.required]),
      id_rol:new FormControl('',[Validators.required]),
      activo:new FormControl('',[Validators.required])
    });
  }

  Guardar() {
    this.UsuarioGuardar = this.formAdd.value;

    this.service.getUsuariosUserName(this.UsuarioGuardar)
    .subscribe(data => {
      this.ocupado = data
      if(this.ocupado == null) {
        this.ValidadorGuardar();
      } else {
        alert("El nombre de usuario " + this.UsuarioGuardar.nombre + " ya se encuentra en uso")
      }
    });;
  }

  ValidadorGuardar() {
    this.service.crearUsuario(this.UsuarioGuardar)
      .subscribe(data => {
        this.router.navigate(["listar"])
      });
  }

  Roles() {
    this.service.getRoles()
    .subscribe(data => {
      this.roles = data
    });
  }
}
