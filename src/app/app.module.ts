import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// imports generales
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

// almacen
import { InventarioComponent } from './componentes/almacen/inventario/inventario.component';
import { ConceptoRegistroComponent } from './componentes/almacen/concepto-registro/concepto-registro.component';

// compras
import { ProveedorRegistroComponent } from './coponentes/proveedor-registro/proveedor-registro.component';
import { MenuAppsComponent } from './componentes/menu-apps/menu-apps.component';

// ventas


@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    NavbarComponent,
    InventarioComponent,
    ProveedorRegistroComponent,
    ConceptoRegistroComponent,
    MenuAppsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
