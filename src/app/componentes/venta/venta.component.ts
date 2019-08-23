import { Component, OnInit } from '@angular/core';
import { VentasService} from 'src/app/servicios/ventas/ventas.service'
import { Venta } from 'src/app/modelos/Venta'
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  constructor(private ventaService:VentasService) {}
  venta= new Array<Venta>();
  buscar: string;
  ngOnInit() {
    this.venta = new Array<Venta>();
    this.buscar = "";

    this.ventaService.conectar();
    this.obtenerVentas();

    this.ventaService.lista_ventas.subscribe(inv => {
      this.venta = inv;
    });
  }
  obtenerVentas(){
    this.ventaService.obtenerVentas().subscribe(venta=>{
      this.ventaService.enviarVentas(venta);
    });
  }

  buscarConcepto(){
    if(this.buscar){
      this.ventaService.buscarVentas(this.buscar).subscribe(inv => {
        console.log(inv)
        if(inv.length != 0){
          this.venta = inv;
        }
        else{
          alert('no se encontró un artículo con ese nombre');
        }
      })
    }else{
      this.obtenerVentas();
    }
  }

}
