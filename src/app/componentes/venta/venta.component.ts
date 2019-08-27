import { Component, OnInit } from '@angular/core';
import { VentasService} from 'src/app/servicios/ventas/ventas.service'
import { Venta } from 'src/app/modelos/Venta'
import {Cliente} from 'src/app/modelos/cliente'
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  constructor(private ventaService: VentasService) {}
  venta= new Array<Venta>();
  cliente = new Array<Cliente>();
  buscar: string;
  ngOnInit() {
    let date = new Date();
    
   // console.log('FECHA '+date.getDate() + date.getUTCMonth() + date.getFullYear());
    this.venta = new Array<Venta>();
    this.buscar = "";

    this.ventaService.conectar();
    this.obtenerVentas();

    this.ventaService.lista_ventas.subscribe(inv => {
      this.venta = inv;
    });
  }
  obtenerVentas(){
    this.getClientes();
    this.ventaService.obtenerVentas().subscribe(venta=>{
      this.ventaService.enviarVentas(venta);
      
    });
    
    this.venta.forEach(v => {
      this.cliente.forEach(c => {
        if(c.id == v.cliente){v.cliente = c.nombre_cliente}
      });
    });
    console.log("ventas")
    console.log(this.venta)
  }
  getClientes() {
    this.ventaService.get('obtener-clientes').subscribe( (r: Cliente []) => {
     this.cliente = r;
    });
  }

  buscarVentas(){
    if(this.buscar){
      this.ventaService.buscarVentas(this.buscar).subscribe(inv => {
       // console.log(inv)
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
  
  onKeydown(event) {
    if (event.key === "Enter") {
      this.buscarVentas();
    }
  }

}
