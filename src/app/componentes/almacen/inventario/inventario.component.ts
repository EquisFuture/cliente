import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventarioService } from 'src/app/servicios/almacen/inventario.service';
import { Concepto } from 'src/app/modelos/Concepto';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit, OnDestroy {

  constructor(private inventarioService: InventarioService) { }

  inventario = new Array<Concepto>();
  buscar: string;
  ngOnInit() {
    this.inventario = new Array<Concepto>();
    this.buscar = "";

    this.obtenerInventario();
    /*this.inventarioService.conectar();

    this.inventarioService.lista_conceptos.subscribe(inv => {
      this.inventario = inv;
    });*/
  }

  ngOnDestroy(): void {
    this.inventarioService.cerrarConexion();
    this.buscar = "";
  }

  obtenerInventario(){
    this.inventarioService.obtenerInventario().subscribe(inventario=>{
      this.inventario = inventario;
      //this.inventarioService.actualizarInventario(inventario);
    });
  }

  buscarConcepto(){
    if(this.buscar){
      this.inventarioService.buscarConcepto(this.buscar).subscribe(inv => {
        console.log(inv)
        if(inv.length != 0){
          this.inventario = inv;
        }
        else{
          alert('no se encontró un artículo con ese nombre');
        }
      })
    }else{
      this.obtenerInventario();
    }
  }

  concepto_registrar: string;
  descripcion_registrar: string;
  cantidad_registrar: number;
  udm_registrar: string;
  precio_lista_registrar: number;
  precio_publico_registrar: number;
  registrarConcepto(){
    let concepto = new Concepto();
    concepto.concepto = this.concepto_registrar;
    concepto.descripcion = this.descripcion_registrar;
    concepto.cantidad = this.cantidad_registrar;
    concepto.udm = this.udm_registrar;
    concepto.precio_lista = this.precio_lista_registrar;
    concepto.precio_publico = this.precio_publico_registrar;
    console.log(concepto);
  }
}
