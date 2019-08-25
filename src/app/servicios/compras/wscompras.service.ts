import { Injectable } from '@angular/core';
import Ws from '@adonisjs/websocket-client';

const ws = Ws('ws://localhost:3333');


@Injectable({
  providedIn: 'root'
})
export class WscomprasService {
  public socket: Ws;

  constructor() { }


  conectarws() {
    try {
      ws.connect();
    } catch (error) {
      console.log(error);
    }
  }

  desconectarws() {
    try {
      this.socket.close();
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
          console.log('Conexion exitosa al socket Compras');
        });
        this.socket.on('error', () => {
          console.log('Conexion fallida al socket');
        });
        this.socket.on('close', () => {
          console.log('conexion de socket compras cerrada');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  getSocket(): Ws {
    return this.socket;
  }
}
