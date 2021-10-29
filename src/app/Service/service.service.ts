import { Roles } from './../Modelo/Roles';
import { Usuario } from 'src/app/Modelo/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<Usuario[]>('http://localhost:8080/usuarios/listar');
  }

  crearUsuario(Usuario:Usuario): Observable<any> {
    return this.http.post<Usuario>('http://localhost:8080/usuarios/adicionar',Usuario);
  }

  eliminarUsuario(Usuario:Usuario): Observable<any> {
    return this.http.post<Usuario>('http://localhost:8080/usuarios/eliminar',Usuario);
  }

  getUsuariosId(id:Number): Observable<Usuario> {
    return this.http.get<Usuario>('http://localhost:8080/usuarios/consultarFindOne/'+id);
  }

  editarUsuario(Usuario:Usuario): Observable<any> {
    return this.http.put<Usuario>('http://localhost:8080/usuarios/editar/'+Usuario.id_usuario,Usuario);
  }

  getUsuariosUserName(usuario:Usuario): Observable<any> {
    return this.http.get<Usuario>('http://localhost:8080/usuarios/consultar/'+usuario.nombre);
  }

  getBuscarUserNombre(nombre:String): Observable<any> {
    return this.http.get<Usuario>('http://localhost:8080/usuarios/buscador/'+nombre);
  }

  getRoles(): Observable<any> {
    return this.http.get<Roles>('http://localhost:8080/usuarios/consultarRoles');
  }

  getConsecutivo(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/usuarios/consec');
  }
}
