import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ListadoFacturasComponent } from './listado-facturas/listado-facturas.component';
import { EdicionFacturaComponent } from './edicion-factura/edicion-factura.component';
import { CrearFacturaComponent } from './crear-factura/crear-factura.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListadoFacturasComponent,
    EdicionFacturaComponent,
    CrearFacturaComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
