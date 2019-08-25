import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuario } from 'src/app/modelos/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  usuarios: Array<Usuario>;
  ngOnInit() {
    this.usuarios = new Array<Usuario>();

    this.usuariosService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
