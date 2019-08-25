import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras/compras.service';
import { Router } from '@angular/router';
import { Compra } from 'src/app/modelos/compra';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  tabla_compras = [];
  constructor(private servicio: ComprasService, private router: Router) { }

  ngOnInit() {
    this.getTabla();
  }

  getTabla(){
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

}
