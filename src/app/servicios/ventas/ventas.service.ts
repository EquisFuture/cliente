import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import Ws from '@adonisjs/websocket-client';
const ws = Ws('ws://localhost:3333')
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor() { }

  conectar(){
    try{
      // generamos la conexión al socket
      ws.connect();
      const canal = ws.subscribe('inventario')

      // éste método se ejecutará cuando la conexión al canal inventario esté lista.
      canal.on('ready', () => {
        console.log('** suscripción al inventario lista');
      })
      // cuando reciba una actualización, lo mandará a la lista de usuarios
      canal.on('actualizar', (inventario) => {
        console.log("** inventario recibido del ws")
      })
    }
    catch(e){console.log('ya está conectado')}
  }
}
