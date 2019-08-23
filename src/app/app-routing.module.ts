import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

// imports generales
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';

// almacen
import { InventarioComponent } from './componentes/almacen/inventario/inventario.component';

// ventas


// compras


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: PaginaPrincipalComponent},
  {path: 'almacen', component: InventarioComponent},
  {path: '**', redirectTo: "inicio" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
