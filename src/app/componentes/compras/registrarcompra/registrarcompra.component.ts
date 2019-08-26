import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras/compras.service';
import { Router } from '@angular/router';
import { WscomprasService } from 'src/app/servicios/compras/wscompras.service';
import { Proveedor } from 'src/app/modelos/proveedor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticuloCompra } from 'src/app/modelos/articulo-compra';
@Component({
  selector: 'app-registrarcompra',
  templateUrl: './registrarcompra.component.html',
  styleUrls: ['./registrarcompra.component.css']
})
export class RegistrarcompraComponent implements OnInit, OnDestroy {
  public nuevoProveedor: FormGroup;
  public nuevoArticulo: FormGroup;
  public proveedorSelect: FormGroup;

  constructor(private servicio: ComprasService, private router: Router, private wsocket: WscomprasService) {
    this.nuevoProveedor = new FormBuilder().group({
      nombre_proveedor: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
    this.nuevoArticulo = new FormBuilder().group({
      concepto: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: [1, Validators.required],
      udm: ['Pieza', Validators.required],
      precio: [1, Validators.required]
    });
    this.proveedorSelect = new FormBuilder().group({
        proveedor: ['', Validators.required]
      });
   }

  proveedores = new Array<Proveedor>();
  articulos = new Array<ArticuloCompra>();
  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getProveedores();
    this.proveedorSelect.controls.proveedor.setValue(1);
    this.wsocket.traerSubscripcion('compras').on('actualizarProveedores', () => {
      this.getProveedores();
    });
  
  }

  getProveedores() {
    this.servicio.get('proveedores').subscribe( (r: Proveedor []) => {
     this.proveedores = r;
     console.log(r)
    });
  }

  registrarProveedor() {
    try {
      let pro = new Proveedor();
      pro.nombre_proveedor = this.nuevoProveedor.controls.nombre_proveedor.value;
      pro.direccion = this.nuevoProveedor.controls.direccion.value;
      pro.telefono = this.nuevoProveedor.controls.telefono.value;
      pro.correo = this.nuevoProveedor.controls.correo.value;
  
      this.servicio.post('registrar-proveedor', pro).subscribe(r => {
        console.log(r);
        this.nuevoProveedor.reset();
        window.document.getElementById('closeProveedorModal').click();
        this.wsocket.getSocket().emit('nuevoProveedor');
      });
     

    } catch (error) {
      console.log(error);
    }
  }
  agregarArticulo() {
    let articulo = new ArticuloCompra();
    articulo.concepto = this.nuevoArticulo.controls.concepto.value;
    articulo.descripcion = this.nuevoArticulo.controls.descripcion.value;
    articulo.cantidad = this.nuevoArticulo.controls.cantidad.value;
    articulo.udm = this.nuevoArticulo.controls.udm.value;
    articulo.precio = this.nuevoArticulo.controls.precio.value;
    this.articulos.push(articulo);
    this.nuevoArticulo.reset();
    this.nuevoArticulo.controls.udm.setValue('Pieza');
    this.nuevoArticulo.controls.cantidad.setValue(1);
    this.nuevoArticulo.controls.precio.setValue(1);
    window.document.getElementById('closeFormaArticulo').click();

  }


  registrarCompra() {

    let costo = 0;
    let importe = 0;
    if(this.articulos.length > 0) {
      this.articulos.forEach(element => {
        importe = element.cantidad * element.precio;
        costo = costo + importe;
      });
      let pro = this.proveedorSelect.controls.proveedor.value;
      let compra_json = {costo_total: costo, proveedor: pro, listado: this.articulos};
      this.servicio.post('registrar-compra', compra_json).subscribe(response => {
        console.log(response);
        this.router.navigate(['compras']);
        this.wsocket.getSocket().emit('nuevaCompra');
      });
    } else {
      alert('Debes agregar al menos un articulo a la compra.');
    }
  }
  removerArticulo(index: number) {
    this.articulos.splice(index, 1);
  }
}
