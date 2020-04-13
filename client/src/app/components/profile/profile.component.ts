import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioUpdate } from '../../models/usuarioUpdate'
import { LoginService } from '../../services/login.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  usuario: UsuarioUpdate = {
    id_usuario: '', // agregado
    nombre: '', // agregado
    nickname: '', // agregado
    pass: '',
    foto: 0,
    urlimagen: '',
    base64: '',
    extension: ''
  };

  datosObligarios: boolean = true;
  actualizado: boolean = false;

  constructor(private loginServices: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("id_usuario") === null) { this.router.navigate(['login']); }
    this.usuario.id_usuario=localStorage.getItem("id_usuario");
    this.obtenerDatos();
  }

  update() {
    if (this.usuario.nombre != "" && this.usuario.nickname != "") {

      if(this.usuario.foto === 1){
        if(this.usuario.extension !== 'jpg'){
          this.usuario.base64 = this.usuario.base64.replace('data:image/'+this.usuario.extension+';base64,','');
        }
        this.usuario.base64 = this.usuario.base64.replace('data:image/jpeg;base64,','');
      }
      
      this.datosObligarios = true;
      this.actualizado = true;

      var id = localStorage.getItem("id_usuario");
      this.loginServices.updateUser(id, this.usuario)
        .subscribe(
          (res:any) => {
            console.log(res);
            //Actualizando LocalStorage
            this.usuario.id_usuario=res.id_usuario;
            this.usuario.nombre=res.nombre;
            this.usuario.nickname=res.nickname;
            this.usuario.urlimagen=res.urlimagen;
            localStorage.setItem("nombre", res.nombre);
            localStorage.setItem("nickname", res.nickname);
            localStorage.setItem("urlimagen", res.urlimagen);
            window.location.reload();
          },
          err => {
            console.log(err);
          }
        );

    } else {
      this.datosObligarios = false;
      this.actualizado = false;
    }
   window.location.reload();
  }

  cargandoImagen(fileInput: any) {
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

  obtenerDatos(){
    this.loginServices.getDatos(localStorage.getItem("id_usuario"))
        .subscribe(
          (res:any)=>{
            this.usuario.nombre=res.nombre;
            this.usuario.nickname=res.nickname;
            this.usuario.urlimagen=res.urlimagen;
            localStorage.setItem("nombre", res.nombre);
            localStorage.setItem("nickname", res.nickname);
            localStorage.setItem("urlimagen", res.urlimagen);
          },
          err=>{
            console.log(err);
          }
        );
        
  }



}
