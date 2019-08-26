import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuario } from 'src/app/modelos/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  constructor(private usuariosService: UsuariosService) { }

  // campos de edicion de usuario
  id_editar: number;
  username_editar: string;
  email_editar: string;
  rol_editar: string;

  // campos de nuevo usuario
  username: string;
  email: string;
  password: string;
  password2: string;
  rol: string;

  usuarios: Array<Usuario>;
  usuario_editar: Usuario;
  ngOnInit() {
    this.usuarios = new Array<Usuario>();
    this.usuario_editar = new Usuario;

    this.usuariosService.conectar();

    this.usuariosService.obtenerUsuarios().subscribe(usuarios=>{
      this.usuariosService.enviarUsuarios(usuarios);
    });

    this.usuariosService.lista_usuarios.subscribe(usuarios => {
      this.usuarios = usuarios;
    });
    this.usuariosService.usuario_editar.subscribe(usuario =>{
      this.usuario_editar = (usuario as unknown) as Usuario;
      this.id_editar = this.usuario_editar.id;
      this.username_editar = this.usuario_editar.username;
      this.email_editar =this.usuario_editar.email;
      this.rol_editar = this.usuario_editar.rol;
    });
  }

  ngOnDestroy(): void {
    this.usuariosService.cerrarConexion();
  }

  registrarUsuario(){
    if((this.username && this.email && this.password && this.password2 && this.rol) && this.password == this.password2){ 
      let usuario = {id: this.usuario_editar.id, username: this.username, email: this.email, password: this.password, rol: this.rol}
      this.usuariosService.registrarUsuario(usuario).subscribe(usuarios => {
        this.usuariosService.enviarUsuarios(usuarios);
        window.document.getElementById('cerrar_añadir').click();
      });
    }else{
      alert('Revise su información.');
    }
  }

  seleccionarUsuario(usuario: Usuario){
    this.usuariosService.actualizarUsuario(usuario);
  }

  editarUsuario(){
    if(this.username_editar && this.email_editar && this.rol_editar){
      let usuario = {id: this.id_editar, username: this.username_editar, email: this.email_editar, rol: this.rol_editar}
      this.usuariosService.editarUsuario(usuario).subscribe(usuarios => {
        this.usuariosService.enviarUsuarios(usuarios);
        window.document.getElementById('cerrar_editar').click();
      });
    }else{
      alert('Revise su información.');
    }
  }
}
