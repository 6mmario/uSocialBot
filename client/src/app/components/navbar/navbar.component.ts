import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  
  constructor(private logoutUser:LoginService, private router:Router) { }

  public isLogged = false;

  ngOnInit(): void {
    this.onCheckUser();
    
  }

  salir():void{
    this.logoutUser.logoutUser();
    this.isLogged=false;
    this.router.navigate(['/']);

  }

  onCheckUser(): void {
    if (localStorage.getItem("id_usuario") == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }


  

}
