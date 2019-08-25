import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras/compras.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrarcompra',
  templateUrl: './registrarcompra.component.html',
  styleUrls: ['./registrarcompra.component.css']
})
export class RegistrarcompraComponent implements OnInit {

  constructor(private servicio: ComprasService, private router: Router) { }

  ngOnInit() {
  }

}
