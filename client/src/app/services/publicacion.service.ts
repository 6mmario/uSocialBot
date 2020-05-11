import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Publicacion } from '../models/publicacion';
import { ipApp } from '../models/host';
@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  API_URI = ipApp;;

  constructor(private http: HttpClient) { }

  savePublicacion(publicacion: Publicacion) {
    return this.http.post(`${this.API_URI}/publicacion`, publicacion);
  }

  getAll (){
    return this.http.get(`${this.API_URI}/publicacion`);
  }

  getAmigos(){
    return this.http.get(`${this.API_URI}/usuario`);
  }

  getPublicacion(id){
    return this.http.get(`${this.API_URI}/publicacion/${id}`)
  }
}
