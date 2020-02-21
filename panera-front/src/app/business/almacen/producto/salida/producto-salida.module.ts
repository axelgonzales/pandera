import { ProductoSalidaBandejaComponent } from './bandeja/producto-salida-bandeja.component';
import { ProductoSalidaRegistroComponent } from './registro/producto-salida-registro.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const PRODUCTO_SALIDA_COMPONENTS = [
    ProductoSalidaBandejaComponent,
    ProductoSalidaRegistroComponent
 ];

@NgModule({
    declarations: PRODUCTO_SALIDA_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: PRODUCTO_SALIDA_COMPONENTS
})
export class ProductoSalidaModule {

}
