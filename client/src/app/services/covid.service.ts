import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  API_URI = 'https://fherherand.github.io/covid-19-data-update/timeseries.json';

  constructor(private http: HttpClient) { }

  obtenerInfo() {
    return this.http.get(`${this.API_URI}`);
  }
}
