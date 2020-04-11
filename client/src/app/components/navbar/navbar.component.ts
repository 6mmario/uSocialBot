import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private logoutUser:LoginService) { }

  ngOnInit(): void {
  }

  salir():void{
    this.logoutUser.logoutUser();
  }

}
