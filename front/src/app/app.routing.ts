import { RouterModule, Routes } from '@angular/router';
import { CrearFacturaComponent } from './crear-factura/crear-factura.component';
import { EdicionFacturaComponent } from './edicion-factura/edicion-factura.component';
import { ListadoFacturasComponent } from './listado-facturas/listado-facturas.component';
import { LoginComponent } from './login/login.component';

/**
 * Archivo de rutas para la navegación en el FrontEnd
*/
const routes: Routes = [
    { path: '', redirectTo:'/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: "full"},
    { path: 'listadoFacturas', component: ListadoFacturasComponent, pathMatch: "full"},
    { path: 'edicionFactura/:idFactura', component: EdicionFacturaComponent, pathMatch: "full"},
    { path: 'crearFactura', component: CrearFacturaComponent, pathMatch: "full"},
];

export const routing = RouterModule.forRoot(routes);