import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// imports generales
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { MenuAppsComponent } from './componentes/menu-apps/menu-apps.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios/usuarios.component';

// almacen
import { InventarioComponent } from './componentes/almacen/inventario/inventario.component';

// compras
import { ComprasComponent } from './componentes/compras/compras.component';
import { RegistrarcompraComponent } from './componentes/compras/registrarcompra/registrarcompra.component';

// ventas
import { VentaComponent } from './componentes/venta/venta.component';
import { NuevaventaComponent } from './componentes/nuevaventa/nuevaventa.component';
import { HtmltopdComponent } from './componentes/compras/htmltopd/htmltopd.component';



@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    NavbarComponent,
    InventarioComponent,
    MenuAppsComponent,
    LoginComponent,
    UsuariosComponent,
    VentaComponent,
    RegistrarcompraComponent,
    ComprasComponent,
    NuevaventaComponent,
    HtmltopdComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
