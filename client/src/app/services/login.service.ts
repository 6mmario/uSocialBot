import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from '../models/usuarioLogin';
import { UsuarioUpdate } from '../models/usuarioUpdate';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI='http://localhost:3000/';

  constructor(private http: HttpClient) { }

  loginUser(usuario:UsuarioLogin){
    return this.http.post(`${this.API_URI}usuario/OAuth`, usuario);
  }

  updateUser(id:string, usuario:UsuarioUpdate){
      return this.http.put(`${this.API_URI}usuario/${id}`, usuario);

  }

  setUser(user: UsuarioLogin): void {
    var user_string = user;
    localStorage.setItem("id_usuario", user_string.id_usuario);
    localStorage.setItem("nombre", user_string.nombre);
    localStorage.setItem("nickname", user_string.nickname);
  }

  logoutUser():void {
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("nickname");
  }
}
