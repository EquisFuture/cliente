import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

// imports generales
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';

// almacen
import { InventarioComponent } from './componentes/almacen/inventario/inventario.component';

// ventas
import { VentaComponent } from './coponentes/venta/venta.component';

// compras


const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent},
  {path: 'almacen', component: InventarioComponent},
  {path: 'ventas', component: VentaComponent},
  {path: '**', redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
