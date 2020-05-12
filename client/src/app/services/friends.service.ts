import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Amistad } from '../models/amistad';
import { ipApp } from '../models/host';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  API_URI = ipApp;;

  constructor(private http: HttpClient) { }

  agregarAmigo(amistad: Amistad){
    return this.http.post(`${this.API_URI}/usuario/amistad`, amistad);
  }
}
