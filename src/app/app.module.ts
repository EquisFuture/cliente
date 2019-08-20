import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProveedorRegistroComponent } from './coponentes/proveedor-registro/proveedor-registro.component';
import { ConceptoRegistroComponent } from './coponentes/concepto-registro/concepto-registro.component';
import { VentaComponent } from './coponentes/venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    ProveedorRegistroComponent,
    ConceptoRegistroComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
