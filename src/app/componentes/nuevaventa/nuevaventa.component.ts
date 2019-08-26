import { Component, OnInit } from '@angular/core';
import { VentasService} from 'src/app/servicios/ventas/ventas.service';
import { Venta } from 'src/app/modelos/Venta';
@Component({
  selector: 'app-nuevaventa',
  templateUrl: './nuevaventa.component.html',
  styleUrls: ['./nuevaventa.component.css']
})
export class NuevaventaComponent implements OnInit {

  constructor(private servicio: VentasService) { }

  ngOnInit() {
  }

}
