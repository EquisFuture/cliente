import { Component, OnInit, OnDestroy } from '@angular/core';
import { VentasService} from 'src/app/servicios/ventas/ventas.service';
import { Venta } from 'src/app/modelos/Venta';
import {Cliente} from 'src/app/modelos/cliente'
import {Concepto} from 'src/app/modelos/Concepto'
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import {WsventasService} from 'src/app/servicios/ventas/wsventas.service';
import {ArticuloCompra} from 'src/app/modelos/articulo-venta';
@Component({
  selector: 'app-nuevaventa',
  templateUrl: './nuevaventa.component.html',
  styleUrls: ['./nuevaventa.component.css']
})
export class NuevaventaComponent implements OnInit,OnDestroy {
  public nuevoProveedor: FormGroup;
  public nuevoArticulo: FormGroup;
  public proveedorSelect: FormGroup;
  public inventarioSelect: Form;
  cliente = new Array<Cliente>();
  venta= new Array<Venta>();
  //public inventarioSelect: FormGroup;
  public inventario = new Array<Concepto>();
  constructor(private servicio: VentasService,private router: Router, private wsocket: WsventasService) {
    this.nuevoProveedor = new FormBuilder().group({
      nombre_proveedor: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
    this.nuevoArticulo = new FormBuilder().group({
      inventarioSelect:['',Validators.required],
      cantidad: [1, Validators.required]
    });
    this.proveedorSelect = new FormBuilder().group({
        proveedor: ['', Validators.required]
      });
    /*this.inventarioSelect = new FormBuilder().group({
      inventarioSelect:['',Validators.required]
    })*/
   }

  proveedores = new Array<Cliente>();
  articulos = new Array<ArticuloCompra>();
  ngOnInit() {
    this.getProveedores();
    this.getAlmacen();
    this.proveedorSelect.controls.proveedor.setValue(1);
    try {
      //this.servicio.conectar();
      this.wsocket.subscripcion('ventas:registro');
      this.wsocket.traerSubscripcion('ventas:registro').on('actualizarProveedores', () => {
        this.getProveedores();
      });
    } catch (error) {
      console.log(error);
    }
  }
  ngOnDestroy(){
    this.obtenerVentas();
    this.servicio.cerrarConexion();
  }
  getAlmacen(){
    this.servicio.get('obtener-inventario').subscribe( (r: Concepto []) => {
      this.inventario = r;
      console.log('inventario')
      console.log(r)
     });
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
    let desc;
    let price;
    this.inventario.forEach(e => {
      if(this.nuevoArticulo.controls.inventarioSelect.value == e.concepto)
      {
        desc = e.descripcion;
        price = e.precio_publico;
      }
    });
    console.log(this.inventario);
    let date = new Date();
    let articulo = new ArticuloCompra();
    articulo.concepto = this.nuevoArticulo.controls.inventarioSelect.value;
    articulo.descripcion = desc;
    articulo.cantidad = this.nuevoArticulo.controls.cantidad.value;
    articulo.precio = price;
    articulo.fecha = ""+date.getDate() + (date.getMonth()+1) + date.getFullYear();
    this.articulos.push(articulo);
    this.nuevoArticulo.reset();
    this.nuevoArticulo.controls.cantidad.setValue(1);
    window.document.getElementById('closeFormaArticulo').click();

  }


  registrarCompra() {
    let date = new Date()
    let fechad:string = "" + date.getFullYear() + (date.getMonth()+1) + date.getDate()
    let costo = 0;
    let impuesto = new Array<any>();
    impuesto.length = this.inventario.length;
    if(this.articulos.length > 0) {
      this.articulos.forEach(element => {
        costo = costo + element.precio;
      });
      let pro = this.proveedorSelect.controls.proveedor.value;
      let compra_json = {costo_total: costo, cliente: pro,fecha: fechad, listado: this.articulos};
      this.servicio.post('registrar-venta', compra_json).subscribe(response => {
        console.log(response);
        this.wsocket.getSocket().emit('nuevaCompra');
      });
      this.venta = new Array<Venta>();
      
      this.router.navigate(['ventas']);
    } else {
      alert('Debes agregar al menos un articulo a la compra.');
    }
  }
  
  removerArticulo(index: number) {
    this.articulos.splice(index, 1);
  }
  obtenerVentas(){
    this.getClientes();
    this.servicio.obtenerVentas().subscribe(venta=>{
      this.servicio.enviarVentas(venta);
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
    this.servicio.get('obtener-clientes').subscribe( (r: Cliente []) => {
     this.cliente = r;
    });
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      if (this.nuevoArticulo.valid) {
        this.agregarArticulo();
      }
    }
  }

   }
  
  
  


