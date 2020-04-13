import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioLogin } from '../../models/usuarioLogin'

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioLogin = {
    id_usuario: '',
    nombre: '',
    nickname: '',
    urlimagen: '',
    pass: ''
  };

  dataUsuario: UsuarioLogin = {
    id_usuario: '',
    nombre: '',
    nickname: '',
    urlimagen: '',
    pass: ''
  };

  loginError: boolean = false;
  datosError: boolean = false;
  contraseniaError: boolean = false;

  constructor(private loginServices: LoginService, private router: Router) { }

  ngOnInit(): void {
    
    if (localStorage.getItem("id_usuario") !== null) { this.router.navigate(['publicacion']);}
  }

  ingresar() {
    if (this.usuario.id_usuario == '' || this.usuario.pass == '') {
      this.loginError = true;
      this.datosError = false;
      this.contraseniaError = false;
    } else {
      this.loginError = false;
      this.datosError = false;
      this.contraseniaError = false;
      this.loginServices.loginUser(this.usuario)
        .subscribe(
          (res: any) => {
            if (res.mensaje == "Error en la contrasenia") {
              this.contraseniaError = true;
            } else {
              localStorage.setItem("id_usuario", res.id_usuario);
              localStorage.setItem("nombre", res.nombre);
              localStorage.setItem("nickname", res.nickname);
              localStorage.setItem("urlimagen",res.urlimagen);
              window.location.reload();
            }
          },
          err => {
            this.datosError = true;
          }
        );
    }
  }

}
