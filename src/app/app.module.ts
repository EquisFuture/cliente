import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { InventarioComponent } from './componentes/almacen/inventario/inventario.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    NavbarComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
