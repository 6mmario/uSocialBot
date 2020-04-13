import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Publicacion } from '../models/publicacion';
@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  API_URI = 'http://10.0.2.210:3000/';

  constructor(private http: HttpClient) { }

  savePublicacion(publicacion: Publicacion) {
    return this.http.post(`${this.API_URI}publicacion`, publicacion);
  }

  getAll (){
    return this.http.get(`${this.API_URI}publicacion`);
  }

  getAmigos(){
    return this.http.get(`${this.API_URI}usuario`);
  }
}
