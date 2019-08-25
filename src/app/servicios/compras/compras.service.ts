import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


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

}
