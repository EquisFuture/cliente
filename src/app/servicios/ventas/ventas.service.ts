import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import Ws from '@adonisjs/websocket-client';
import { Observable } from 'rxjs';
import {Venta} from 'src/app/modelos/Venta'
const ws = Ws('ws://localhost:3333')
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private request: HttpClient) { }
  url = "http://localhost:3333/"
  conectar(){
    try{
      // generamos la conexión al socket
      ws.connect();
      const canal = ws.subscribe('ventas')

      // éste método se ejecutará cuando la conexión al canal inventario esté lista.
      canal.on('ready', () => {
        console.log('conectado');
      })
      // cuando reciba una actualización, lo mandará a la lista de usuarios
      canal.on('actualizar', (inventario) => {
        console.log("actualizado")
      })
    }
    catch(e){console.log('ya está conectado')}
  }

  obtenerventas():Observable<Venta[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Venta[]>(this.url +'obtener-ventas', {headers:headers});
  }

  buscarVentas(venta: string): Observable<Venta[]>{
    let json = {venta: venta};
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Venta[]>(this.url +'buscar-venta', {headers:headers, params: json});
  }
}
