import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProductoIngresoRegistroComponent } from './registro/producto-ingreso-registro.component';
import { ProductoIngresoBandejaComponent } from './bandeja/producto-ingreso-bandeja.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const PRODUCTO_INGRESO_COMPONENTS = [
    ProductoIngresoBandejaComponent,
    ProductoIngresoRegistroComponent
 ];

@NgModule({
    declarations: PRODUCTO_INGRESO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    exports: PRODUCTO_INGRESO_COMPONENTS
})
export class ProductoIngresoModule {

}
