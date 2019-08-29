import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private url = 'http://192.168.4.106/3333';


  constructor(private http: HttpClient) { }

  post(link: string, json: any){
    let data = JSON.stringify(json);
    let headers = new HttpHeaders().set('Content-type','Application/json').set('auth', localStorage.getItem('token'));

    return this.http.post(this.url+link,data,{'headers': headers});
  }
  get(link:string){
    return this.http.get(this.url + link);
  }


  public captureScreen(cols: string[], content: any[], title: string)  
  {  
    var data = window.document.getElementById('detalles');
    let pdf = new jspdf(); 
    pdf.text(title, 15, 10)
    
    pdf.autoTable(cols,content);
    pdf.save('mypdf.pdf');
  }

}
