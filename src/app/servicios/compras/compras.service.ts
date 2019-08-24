import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import Ws from '@adonisjs/websocket-client';

const ws = Ws('ws://localhost:3333');


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private url = 'http://localhost:3333/';

  constructor(private http: HttpClient) { }

  post(link: string, json: any){
    let data = JSON.stringify(json);
    let headers = new HttpHeaders().set('Content-type','Application/json').set('auth', localStorage.getItem('token'));

    return this.http.post(this.url+link,data,{'headers': headers});
  }
  get(link:string){
    return this.http.get(this.url + link);
  }

  conectarws() {
    try {
      ws.connect();
    } catch (error) {
      console.log(error);
    }
  }
}
