import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Usuario } from '../modelos/Usuario';
import { BehaviorSubject, Observable } from 'rxjs';
// la variable ws la ruta para conectarse al socket
import Ws from '@adonisjs/websocket-client';
const ws = Ws('ws://192.168.4.106:3333');

@Injectable({
providedIn: "root"
})
export class UsuariosService {

  // aqui se guarda el usuario a editar
  private usuario = new BehaviorSubject([]);
  usuario_editar = this.usuario.asObservable();

  // aqui se guarda la lista de usuarios
  private usuarios = new BehaviorSubject([]);
  lista_usuarios = this.usuarios.asObservable();

  url: string = 'http://192.168.4.106:3333/';
  constructor(private request: HttpClient) { }

  conectar(){
    try{
      // generamos la conexión al socket
      ws.connect();
      const canal = ws.subscribe('usuarios');

      // éste método se ejecutará cuando la conexión al canal usuarios esté lista.
      canal.on('ready', () => {
        console.log('** suscripción usuarios lista');
      })
      // cuando reciba una actualización, lo mandará a la lista de usuarios
      canal.on('actualizar', (usuarios) => {
        console.log("** usuarios recibido del ws")
        this.actualizarUsuarios(usuarios);
      })
    }
    catch(e){console.log('ya está conectado')}
  }

  cerrarConexion(){
    try{
      ws.getSubscription('usuarios').close();
      console.log('** desconectado de usuarios')
    }
    catch(e){console.log('no hay conexion para cerrar')}
  }

  enviarUsuarios(usuarios){
    try{
      ws.getSubscription('usuarios').emit('actualizar', usuarios);
    }catch(e){ console.log(e); }
  }

  // actualiza la tabla de usuarios
  actualizarUsuarios(usuarios){
    this.usuarios.next(usuarios);
  }

  // actualiza el usuario a editar
  actualizarUsuario(usuario){
    this.usuario.next(usuario);
  }

  registrarUsuario(usuario: any){
    let headers = new HttpHeaders().set('Content-Type','application/json').set('auth',localStorage.getItem('token'));
    return this.request.post(this.url + 'registrar-usuario', usuario, {headers:headers});
  }

  iniciarSesion(email: string, password: string){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.post(this.url+"login", {email: email, password: password}, {headers:headers});
  }

  obtenerUsuarios(): Observable<Usuario[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('auth',localStorage.getItem('token'));
    return this.request.get<Usuario[]>(this.url + 'obtener-usuarios', {headers:headers});
  }

  editarUsuario(usuario: any){
    console.log(usuario)
    let headers = new HttpHeaders().set('Content-Type','application/json').set('auth',localStorage.getItem('token'));
    return this.request.post(this.url + 'editar-usuario', usuario, {headers:headers});
  }

  buscarUsuario(username: string): Observable<Usuario[]>{
    let json = {username: username};
    let headers = new HttpHeaders().set('Content-Type','application/json').set('auth',localStorage.getItem('token'));
    return this.request.get<Usuario[]>(this.url +'buscar-usuario', {headers:headers, params: json});
  }
}
;