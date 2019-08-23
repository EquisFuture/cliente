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


// compras


const routes: Routes = [
<<<<<<< HEAD
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: PaginaPrincipalComponent},
  {path: 'almacen', component: InventarioComponent},
  {path: '**', redirectTo: "inicio" }
=======
  {path: '', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'inicio', component: PaginaPrincipalComponent, canActivate:[AuthGuard]},
  {path: 'almacen', component: InventarioComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: ""}
>>>>>>> 3699e4de65c2e94d508ccfb4c91a1303bd3bb743
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
