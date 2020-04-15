import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { ipApp } from '../models/host';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI = ipApp;;

  constructor(private http: HttpClient) { }

  saveUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/usuario`, usuario);
  }
}
