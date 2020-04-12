import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from '../../models/publicacion';
import { PublicacionService  } from '../../services/publicacion.service'
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  cardImageBase64: string;
  suImagen: 0;
  publicacion: Publicacion = {
    texto: '',
    urlimagen: '',
    USUARIO_id_usuario: '',
    base64: '',
    extension: '',
    imagen: 0,
  }

  publicaciones: any = [];

  constructor(private publicacionServices: PublicacionService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerTodas();
  }

  obtenerTodas(){
    this.publicacionServices.getAll().subscribe(
      res => {
        console.log(res);
        this.publicaciones = res;

      },
      err => console.log(err)
    );
  }

}
