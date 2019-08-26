import { Injectable } from '@angular/core';
import Ws from '@adonisjs/websocket-client';

const ws = Ws('ws://localhost:3333');
@Injectable({
  providedIn: 'root'
})
export class WsventasService {

  public socket: Ws;

  constructor() { }


  conectarws() {
    try {
      ws.connect();
    } catch (error) {
      console.log(error);
    }
  }

  desconectarws(canal: string) {
    try {
      this.traerSubscripcion(canal).close();
    } catch (error) {
      console.log(error);
    }
  }

  subscripcion(canal: string) {
   if( this.socket === undefined) {
      try {
        ws.connect();
        this.socket = ws.subscribe(canal);
        this.socket.on('ready', () => {
          console.log('Conexion exitosa al socket ' + canal);
        });
        this.socket.on('error', () => {
          console.log('Conexion fallida al socket' + canal);
        });
        this.socket.on('close', () => {
          console.log('conexion cerrada de socket' + canal);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  traerSubscripcion(canal: string) {
    return this.socket = ws.getSubscription(canal);
  }
  getSocket(): Ws {
    return this.socket;
  }
}
