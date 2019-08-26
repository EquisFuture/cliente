import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras/compras.service';
import { Router } from '@angular/router';
import { Compra } from 'src/app/modelos/compra';
import { WscomprasService } from 'src/app/servicios/compras/wscompras.service';
import { ArticuloCompra } from 'src/app/modelos/articulo-compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.wsocket.desconectarws('compras:resumen');
  }
  tabla_compras = [];
  buscar: string;
  f_inicio: any;
  f_fin: any;
  b_compra = new Array<ArticuloCompra>();
  f_compra: any;
  constructor(private servicio: ComprasService, private router: Router, public wsocket: WscomprasService) {
   try {
     this.wsocket.traerSubscripcion('compras').close();
   } catch (error) {
     console.log(error);
   }
  }

  ngOnInit() {
    this.getTabla();
    try {
      this.wsocket.subscripcion('compras:resumen');
      this.wsocket.traerSubscripcion('compras:resumen').on('actualizarCompras', () => {
        this.getTabla();
      });

    } catch (error) {
      console.log(error);
    }
  }

  getTabla() {
    this.servicio.get('compras').subscribe((r: Compra[]) => {
      r.forEach(element => {
        this.servicio.get('buscar-usuario/'+element.autoriza).subscribe(us =>{
          let temp = JSON.parse(JSON.stringify(us));
          element.autoriza = temp.usuario;
        });
        this.servicio.get('buscar-proveedor/'+element.proveedor).subscribe(pro =>{
          let temp = JSON.parse(JSON.stringify(pro));
          element.proveedor = temp.proveedor;
        });
      });
      console.log(r);
      this.tabla_compras = r;
    });
  }

  printTabla() {
    console.log(JSON.stringify(this.tabla_compras));
    let tabla = JSON.parse(JSON.stringify(this.tabla_compras));
    tabla.forEach(element => {
      console.log('registro: ' + element.id + " "+ element.costo_total);
    });
  }
  onKeydown(event){
    if(event.key === 'Enter'){
      this.buscador(this.buscar);
    }
  }
  buscador(keyword: string) {
    this.servicio.get('buscador-compras/' + keyword).subscribe( r => {
      console.log(r);
    });
  }
  filtrar() {
    console.log('inicio: ' + this.f_inicio);
    console.log('fin: ' + this.f_fin);
  }

  buscarFolioCompra(folio: any) {
      this.b_compra = new Array<ArticuloCompra>();
    

      this.servicio.get('buscar-compra/' + folio).subscribe( (compras_r: ArticuloCompra[] ) => {
        console.log(compras_r.length);
        if (compras_r.length < 1){
          const articuloDefasults = new ArticuloCompra();
          articuloDefasults.concepto = 'N/A';
          articuloDefasults.descripcion = 'N/A';
          articuloDefasults.cantidad = 0;
          articuloDefasults.udm = 'N/A';
          articuloDefasults.precio = 0;
          this.b_compra.push(articuloDefasults);
        } else {

          this.b_compra = compras_r;
        }
      });
  
  }

  folioCompra(): boolean {
    if (this.f_compra === undefined || this.f_compra === null) {

      return true;
    } else {
      return false;
    }
  }

  buscarCompra(event){
    if (event.key === 'Enter'){
      this.buscarFolioCompra(this.f_compra);
    }
  }
}
