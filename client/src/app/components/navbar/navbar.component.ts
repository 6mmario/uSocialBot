import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private logoutUser:LoginService, private router:Router) { }

  public isLogged = false;
  public usuario="";

  ngOnInit(): void {
    // this.obtenerDatos();
    this.onCheckUser();
    
  }

  salir():void{
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("nickname");
    localStorage.removeItem("urlimagen")
    this.isLogged=false;
    this.router.navigate(['login']);

  }

  onCheckUser(): void {
    if (localStorage.getItem("id_usuario") == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
      this.usuario =localStorage.getItem("nickname");
      console.log('accc');
    }
  }

  obtenerDatos(){
    this.logoutUser.getDatos(localStorage.getItem("id_usuario"))
        .subscribe(
          (res:any)=>{
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
