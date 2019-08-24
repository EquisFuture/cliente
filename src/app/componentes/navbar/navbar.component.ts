import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private navegar: Router) { }

  token: string;
  logueado: boolean;
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.logueado = false;
    this.logueado = this.verificaSesion();
  }

  verificaSesion(){
    if(this.token){ return true }
    else{ return false }
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.navegar.navigate(['login']);
  }
}