import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { Usuario } from '../../models/usuario';

import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @HostBinding('class') clases = 'row';
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  usuario: Usuario = {
    id_usuario: '', 
    nombre: '', 
    urlimagen: '', 
    nickname: '', 
    pass: '',
    rpassword: '',
    base64: '',
    extension: '',
    foto: 0,
  };

  edit: boolean = false;
  usuarioError : boolean = false;
  rpas: boolean = false;

  constructor(private usuarioServices: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("id_usuario") !== null) { this.router.navigate(['publicacion']);}
  }

  saveNewUser(){
    delete this.usuario.rpassword

    if(this.usuario.extension !== 'jpg'){
      this.usuario.base64 = this.usuario.base64.replace('data:image/'+this.usuario.extension+';base64,','');
    }
    this.usuario.base64 = this.usuario.base64.replace('data:image/jpeg;base64,','');

    
    if(this.usuario.id_usuario === '' || this.usuario.nickname === '' || this.usuario.nombre === '' || this.usuario.pass === '' || this.rpas === false){
      this.usuarioError = true;
    } else {
      this.usuarioError = false;
      
      this.usuarioServices.saveUsuario(this.usuario).
      subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        err => console.log(err)
      );
      
    }
  }

  verificar(dato: HTMLInputElement){
    if(dato.value !== this.usuario.pass){
      dato.value = '';
      return this.rpas = false;
    } 

    return this.rpas = true;

  }

  cargandoImagen(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput.target.files[0].name.split('.').pop());
      this.usuario.extension = fileInput.target.files[0].name.split('.').pop()
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

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
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

                    this.usuario.base64 = this.cardImageBase64;
                    this.usuario.foto = 1;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
