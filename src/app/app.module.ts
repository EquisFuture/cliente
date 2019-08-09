import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProveedorRegistroComponent } from './coponentes/proveedor-registro/proveedor-registro.component';
import { ConceptoRegistroComponent } from './coponentes/concepto-registro/concepto-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    ProveedorRegistroComponent,
    ConceptoRegistroComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
