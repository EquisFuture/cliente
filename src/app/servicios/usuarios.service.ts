import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Usuario } from '../modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = 'http://127.0.0.1:3333/';
  constructor(private request: HttpClient) { }

  registrarUsuario(json: any){
    let headers = new HttpHeaders().set('Content-Type','application/json').set('auth',localStorage.getItem('token'));
    return this.request.post(this.url + 'registrar-usuario', json, {headers:headers});
  }

  iniciarSesion(email: string, password: string){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.post(this.url+"login", {email: email, password: password}, {headers:headers});
  }
}
