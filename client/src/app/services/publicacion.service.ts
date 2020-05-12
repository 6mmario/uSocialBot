import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Publicacion } from '../models/publicacion';
import { ipApp } from '../models/host';
import { Amistad } from '../models/amistad';
@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  API_URI = ipApp;

  constructor(private http: HttpClient) { }

  savePublicacion(publicacion: Publicacion) {
    return this.http.post(`${this.API_URI}/publicacion`, publicacion);
  }

  getAll (id){
    return this.http.get(`${this.API_URI}/publicacion/mis/${id}`);
  }

  getAmigos(id){
    return this.http.get(`${this.API_URI}/usuario/misAmigos/${id}`);
  }

  getPublicacion(id){
    return this.http.get(`${this.API_URI}/publicacion/${id}`)
  }

  deleteAmigo(amistad: Amistad){
    let u1 =  amistad.usuario_id_usuario;
    let u2 =  amistad.usuario_id_usuario1;
    return this.http.delete(`${this.API_URI}/usuario/eliminar/${u1}/${u2}`);
  }
}
