import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

// imports generales
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios/usuarios.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RolGuard } from './guards/rol.guard';

// almacen
import { InventarioComponent } from './componentes/almacen/inventario/inventario.component';

// ventas
import { VentaComponent } from './componentes/venta/venta.component';


// compras
import { ComprasComponent } from './componentes/compras/compras.component';
import { RegistrarcompraComponent } from './componentes/compras/registrarcompra/registrarcompra.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'inicio', component: PaginaPrincipalComponent, canActivate:[AuthGuard]},
  {path: 'almacen', component: InventarioComponent, canActivate:[AuthGuard]},
  {path: 'ventas', component: VentaComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  {path: 'registrarcompra', component: RegistrarcompraComponent, canActivate:[AuthGuard]},
  {path: 'compras', component: ComprasComponent, canActivate:[AuthGuard]},   
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
