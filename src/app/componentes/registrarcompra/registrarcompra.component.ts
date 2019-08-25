import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras/compras.service';
import { Router } from '@angular/router';
import { WscomprasService } from 'src/app/servicios/compras/wscompras.service';
import { Proveedor } from 'src/app/modelos/proveedor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-registrarcompra',
  templateUrl: './registrarcompra.component.html',
  styleUrls: ['./registrarcompra.component.css']
})
export class RegistrarcompraComponent implements OnInit, OnDestroy {
  public nuevoProveedor: FormGroup;
  builder: FormBuilder;
  constructor(private servicio: ComprasService, private router: Router, private wsocket: WscomprasService) {
    this.nuevoProveedor = new FormBuilder().group({
      nombre_proveedor: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
   }

  proveedores = new Array<Proveedor>();
  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getProveedores();
  }

  getProveedores() {
    this.servicio.get('proveedores').subscribe( (r: Proveedor []) => {
     this.proveedores = r;
    });
  }

  registrarProveedor(){
    try {
      let pro = new Proveedor();
      pro.nombre_proveedor = this.nuevoProveedor.controls.nombre_proveedor.value;
      pro.direccion = this.nuevoProveedor.controls.direccion.value;
      pro.telefono = this.nuevoProveedor.controls.telefono.value;
      pro.correo = this.nuevoProveedor.controls.correo.value;
    //   let n_proveedor = {
    //    nombre_proveedor: this.nuevoProveedor.controls.nombre_proveedor.value,
    //    direccion: this.nuevoProveedor.controls.direccion.value,
    //    telefono: this.nuevoProveedor.controls.telefono.value,
    //    correo: this.nuevoProveedor.controls.correo.value
    //  };
      this.servicio.post('registrar-proveedor', pro).subscribe(r => {
        console.log(r);
      });
    } catch (error) {
      console.log(error);
    }
  }

}
