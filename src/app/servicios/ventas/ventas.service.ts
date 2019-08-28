import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import Ws from '@adonisjs/websocket-client';
import { Observable,BehaviorSubject } from 'rxjs';
import {Cliente} from 'src/app/modelos/cliente';
import {Venta} from 'src/app/modelos/Venta'
const ws = Ws('ws://localhost:3333')

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  
  private ventas = new BehaviorSubject([]);
  lista_ventas = this.ventas.asObservable();
  constructor(private request: HttpClient,private http: HttpClient) { }
  url = "http://localhost:3333/"
  
  conectar(){
    try{
      // generamos la conexión al socket
      ws.connect();
      const canal = ws.subscribe('ventas:registro')

      // éste método se ejecutará cuando la conexión al canal inventario esté lista.
      canal.on('ready', () => {
        console.log('conectado');
        
      })
      // cuando reciba una actualización, lo mandará a la lista de usuarios
      canal.on('actualizar', (ventas) => {
        console.log("actualizado");
        this.actualizarVentas(ventas);
      })
    }
    catch(e){console.log('ya está conectado')}
  }

  cerrarConexion(){
    try{
      ws.getSubscription('ventas:registro').close();
      console.log('** desconectado del inventario')
    }
    catch(e){console.log('no hay conexion para cerrar')}
  }

  obtenerVentas():Observable<Venta[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Venta[]>(this.url +'obtener-ventas', {headers:headers});
  }
  
  obtenerClientes():Observable<Venta[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Venta[]>(this.url +'obtener-ventas', {headers:headers});
  }

  buscarVentas(venta: string): Observable<Venta[]>{
    let json = {venta: venta};
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Venta[]>(this.url +'buscar-venta', {headers:headers, params: json});
  }

  enviarVentas(ventas){
    try{
      ws.getSubscription('ventas:registro').emit('actualizar', ventas);
    }catch(e){ console.log(e); }
  }
  post(link: string, json: any){
    let data = JSON.stringify(json);
    let headers = new HttpHeaders().set('Content-type','Application/json').set('auth', localStorage.getItem('token'));

    return this.http.post(this.url+link,data,{'headers': headers});
  }
  actualizarVentas(venta){
    var cliente =  new Array<Cliente>();
    let v;if(venta){
    this.get('obtener-clientes').subscribe( (r: Cliente []) => {
      
      cliente = r;
      
        venta.forEach(v => {
        cliente.forEach(c => {
  
          if(v.cliente == c.id){v.cliente = c.nombre_cliente}
        });
      });
      v = venta;
      
      
     });}
     else {venta = v}
    this.ventas.next(venta);
  }
  
  get(link:string){
    return this.http.get(this.url + link);
  }
    
}
