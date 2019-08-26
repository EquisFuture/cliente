import { Component, OnInit } from '@angular/core';
import { VentasService} from 'src/app/servicios/ventas/ventas.service';
import { Venta } from 'src/app/modelos/Venta';
import {Cliente} from 'src/app/modelos/cliente'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {WsventasService} from 'src/app/servicios/ventas/wsventas.service';
import {ArticuloCompra} from 'src/app/modelos/articulo-venta';
@Component({
  selector: 'app-nuevaventa',
  templateUrl: './nuevaventa.component.html',
  styleUrls: ['./nuevaventa.component.css']
})
export class NuevaventaComponent implements OnInit {
  public nuevoProveedor: FormGroup;
  public nuevoArticulo: FormGroup;
  public proveedorSelect: FormGroup;
  constructor(private servicio: VentasService,private router: Router, private wsocket: WsventasService) {
    try {
      this.wsocket.traerSubscripcion('compras').close();
    } catch (error) {
      console.log(error);
    }
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
      precio: [1, Validators.required]
    });
    this.proveedorSelect = new FormBuilder().group({
        proveedor: ['', Validators.required]
      });
   }

  proveedores = new Array<Cliente>();
  articulos = new Array<ArticuloCompra>();
  ngOnInit() {
    this.getProveedores();
    this.proveedorSelect.controls.proveedor.setValue(1);
    try {
      this.wsocket.subscripcion('ventas:registro');
      this.wsocket.traerSubscripcion('ventas:registro').on('actualizarProveedores', () => {
        this.getProveedores();
      });
    } catch (error) {
      console.log(error);
    }
  }
  getProveedores() {
    this.servicio.get('obtener-clientes').subscribe( (r: Cliente []) => {
     this.proveedores = r;
     console.log(r)
    });
  }

  registrarProveedor() {
    try {
      let pro = new Cliente();
      pro.nombre_cliente = this.nuevoProveedor.controls.nombre_proveedor.value;
      pro.direccion = this.nuevoProveedor.controls.direccion.value;
      pro.telefono = this.nuevoProveedor.controls.telefono.value;
      pro.correo = this.nuevoProveedor.controls.correo.value;
      this.servicio.post('registrar-cliente', pro).subscribe(r => {
        console.log(r);
        this.wsocket.getSocket().emit('nuevoProveedor');
      });
      this.nuevoProveedor.reset();
      window.document.getElementById('closeProveedorModal').click();
    } catch (error) {
      console.log(error);
    }
  }
  agregarArticulo() {
    let date = new Date();
    let articulo = new ArticuloCompra();
    articulo.concepto = this.nuevoArticulo.controls.concepto.value;
    articulo.descripcion = this.nuevoArticulo.controls.descripcion.value;
    articulo.cantidad = this.nuevoArticulo.controls.cantidad.value;
    articulo.precio = this.nuevoArticulo.controls.precio.value;
    articulo.fecha = ""+date.getDate() + date.getUTCMonth() + date.getFullYear();
    this.articulos.push(articulo);
    this.nuevoArticulo.reset();
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
      this.servicio.post('registrar-venta', compra_json).subscribe(response => {
        console.log(response);
        this.wsocket.getSocket().emit('nuevaCompra');
      });
      this.router.navigate(['ventas']);
    } else {
      alert('Debes agregar al menos un articulo a la compra.');
    }
  }
  removerArticulo(index: number) {
    this.articulos.splice(index, 1);
  }
  onKeydown(event) {
    if (event.key === 'Enter') {
      if (this.nuevoArticulo.valid) {
        this.agregarArticulo();
      }
    }
  }

   }
  
  
  


