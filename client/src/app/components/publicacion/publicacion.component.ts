import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from '../../models/publicacion';
import { PublicacionService  } from '../../services/publicacion.service'
import * as _ from 'lodash';
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  suImagen: number = 0;
  publicacion: Publicacion = {
    texto: '',
    urlimagen: '',
    USUARIO_id_usuario: '',
    base64: '',
    extension: '',
    imagen: 0,
  }

  publicaciones: any = [];
  amigos: any = [];
  us:string="";
  constructor(private publicacionServices: PublicacionService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("id_usuario") === null) { this.router.navigate(['login']); }
    this.us=localStorage.getItem("nickname");
    this.obtenerTodas();
    this.listaAmigos();
  }

  obtenerTodas(){
    this.publicacion.USUARIO_id_usuario=localStorage.getItem("id_usuario");
    this.publicacionServices.getAll().subscribe(
      res => {
        this.publicaciones = res;

      },
      err => console.log(err)
    );
  }

  guardarPublicacion(){
    if(this.publicacion.extension !== 'jpg'){
      this.publicacion.base64 = this.publicacion.base64.replace('data:image/'+this.publicacion.extension+';base64','');
    }
    this.publicacion.base64 = this.publicacion.base64.replace('data:image/jpeg;base64','');
    
    this.publicacionServices.savePublicacion(this.publicacion).subscribe(
      res => {
        window.location.reload();
      },
      err => console.log(err)
    );
    
  }

  cargandoImagen(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput.target.files[0].name.split('.').pop());
      this.publicacion.extension = fileInput.target.files[0].name.split('.').pop()
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if ( !_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;

                    this.publicacion.base64 = this.cardImageBase64;
                    this.publicacion.imagen = 1;
                    this.suImagen = 1;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  borrarImagen(){
    this.cardImageBase64 = '';
    this.publicacion.base64 = '';
    this.publicacion.extension = '';
    this.publicacion.imagen = 0;
    this.suImagen = 0;
  }

  listaAmigos(){
    this.publicacionServices.getAmigos().subscribe(
      res => {
        this.amigos = res;

      },
      err => console.log(err)
    );
  }


}
