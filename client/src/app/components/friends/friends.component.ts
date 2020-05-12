import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FriendsService } from '../../services/friends.service';
import { Amistad } from '../../models/amistad';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  data: any = [];
  id: any;
  amistad: Amistad = {
    usuario_id_usuario: '',
    usuario_id_usuario1: '',

  }
  constructor(private usuarioService: UsuarioService, private friendService: FriendsService) { }

  ngOnInit(): void {
   this.id = localStorage.getItem("id_usuario");
   this.amistad.usuario_id_usuario = this.id;
    this.obtenerTodos(this.id);
  }

  obtenerTodos(id){
    this.usuarioService.getTodosAmigos(id)
    .subscribe(
      res => {
        console.log(res);
        this.data = res;

      },
      err => console.log(err)
    );
  }

  agregar(id){
    console.log(id);
    this.amistad.usuario_id_usuario1 = id;
    this.friendService.agregarAmigo(this.amistad)
    .subscribe(
      res => {
        console.log(this.amistad.usuario_id_usuario);
        this.obtenerTodos(this.amistad.usuario_id_usuario);
        window.location.reload();
      },
      err => console.log(err)
    );

  }

}
