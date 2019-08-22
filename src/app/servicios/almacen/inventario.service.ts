import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import Ws from '@adonisjs/websocket-client';
import { Concepto } from 'src/app/modelos/Concepto';
// la variable ws la ruta para conectarse al socket
const ws = Ws('ws://localhost:3333')

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

    // aqui se guarda la lista de los conceptos del inventario
    private conceptos = new BehaviorSubject([]);
    lista_conceptos = this.conceptos.asObservable();

  constructor(private request: HttpClient) { }

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
        this.actualizarInventario(inventario);
      })
    }
    catch(e){console.log('ya está conectado')}
  }

  cerrarConexion(){
    try{
      ws.getSubscription('inventario').close();
      console.log('** desconectado del inventario')
    }
    catch(e){console.log('no hay conexion para cerrar')}
  }

  actualizarInventario(inventario){
    this.conceptos.next(inventario);
  }

  enviarInventario(inventario){
    try{
      ws.getSubscription('inventario').emit('actualizar', inventario);
    }catch(e){ console.log(e); }
  }

  // métodos para el inventario
  url: string = 'http://localhost:3333/';
  obtenerInventario(): Observable<Concepto[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Concepto[]>(this.url +'obtener-inventario', {headers:headers});
  }

  registrarConcepto(c: Concepto): Observable<Concepto[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.post<Concepto[]>(this.url +'registrar-concepto', JSON.stringify(c), {headers:headers});
  }

  buscarConcepto(concepto: string): Observable<Concepto[]>{
    let json = {concepto: concepto};
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Concepto[]>(this.url +'buscar-inventario', {headers:headers, params: json});
  }
}
