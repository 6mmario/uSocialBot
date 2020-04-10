import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  saveUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}usuario`, usuario);
  }
}
