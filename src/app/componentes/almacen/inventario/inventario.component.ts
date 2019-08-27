import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventarioService } from 'src/app/servicios/almacen/inventario.service';
import { Concepto } from 'src/app/modelos/Concepto';
declare var $:any;

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit, OnDestroy {

  constructor(private inventarioService: InventarioService) { }
  // campos del modal para editar un concepto
  concepto_editar: string;
  descripcion_editar: string;
  udm_editar: string;
  precio_lista_editar: number;
  precio_publico_editar: number;
  concepto_edit: Concepto;

  inventario = new Array<Concepto>();
  buscar: string;
  ngOnInit() {
    this.inventario = new Array<Concepto>();
    this.buscar = "";
    this.concepto_edit = new Concepto(); 

    this.inventarioService.conectar();
    this.obtenerInventario();

    this.inventarioService.lista_conceptos.subscribe(inv => {
      this.inventario = inv;
    });

    this.inventarioService.concepto_editar.subscribe(con => {
      this.concepto_edit = (con as unknown) as Concepto;
      this.asignarConceptoEditar((con as unknown) as Concepto);
    });
  }

  ngOnDestroy(): void {
    this.inventarioService.cerrarConexion();
    this.buscar = "";
  }

  obtenerInventario(){
    this.inventarioService.obtenerInventario().subscribe(inventario=>{
      this.inventarioService.enviarInventario(inventario);
    });
  }

  buscarConcepto(){
    if(this.buscar){
      this.inventarioService.buscarConcepto(this.buscar).subscribe(inv => {
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

  editarConcepto(){
    if(this.verificarCamposEditar()){
      let id = (this.concepto_edit as unknown) as Concepto;
      let concepto = {
        id: id.id,
        concepto: this.concepto_editar,
        descripcion: this.descripcion_editar,
        udm: this.udm_editar,
        precio_lista: this.precio_lista_editar,
        precio_publico: this.precio_publico_editar }

      this.inventarioService.editarConcepto(concepto).subscribe(inventario => {
        this.inventarioService.actualizarInventario(inventario);
      });
      this.limpiarCamposEditar();
      window.document.getElementById('cerrar_editar').click();
    }else{
      alert('complete todos los campos.')
    }
  }

  asignarConceptoEditar(con: Concepto){
    if(con){
      this.concepto_editar = con.concepto;
      this.descripcion_editar = con.descripcion;
      this.udm_editar = con.udm;
      this.precio_lista_editar = con.precio_lista;
      this.precio_publico_editar = con.precio_publico;
    }else{ console.log(con) }
  }
  limpiarCamposEditar(){
    this.concepto_editar = null;
    this.descripcion_editar = null;
    this.udm_editar = null;
    this.precio_lista_editar = null;
    this.precio_publico_editar = null;
  }

  // campos del modal para registrar un nuevo concepto
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

    if(this.verificarCampos()){
      console.log(concepto);
      this.inventarioService.registrarConcepto(concepto).subscribe(inv => {
        this.inventario = inv;
        this.limpiarCampos();
      });
      window.document.getElementById('cerrar_añadir').click();
    }else{
      alert('Revise su información.')
    }
  }

  verificarCampos(): boolean{
    if(this.concepto_registrar && this.descripcion_registrar && this.cantidad_registrar && this.udm_registrar && this.precio_lista_registrar && this.precio_publico_registrar){ return true; }
    else{ return false; }
  }

  limpiarCampos(){
    this.concepto_registrar = "";
    this.descripcion_registrar = "";
    this.cantidad_registrar = null;
    this.udm_registrar = "";
    this.precio_lista_registrar = null;
    this.precio_publico_registrar = null;
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.buscarConcepto();
    }
  }

  // Eventos de un concepto
  clickConcepto(concepto: Concepto){
    this.inventarioService.actualizarConcepto(concepto);
  }

  verificarCamposEditar(): boolean{
    if(this.concepto_editar && this.descripcion_editar && this.udm_editar && this.precio_lista_editar && this.precio_publico_editar){ return true; }
    else{ return false; }
  }
}
