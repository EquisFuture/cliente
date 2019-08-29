import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-apps',
  templateUrl: './menu-apps.component.html',
  styleUrls: ['./menu-apps.component.css']
})
export class MenuAppsComponent implements OnInit {

  constructor() { }

  usuario: string;
  rol: string;
  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.rol = localStorage.getItem('rol');
  }

}
