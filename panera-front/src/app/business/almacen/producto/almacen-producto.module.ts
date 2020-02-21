import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoIngresoModule } from './ingreso/producto-ingreso.module';
import { ProductoModule } from './producto/producto.module';
import { ProductoSalidaModule } from './salida/producto-salida.module';
import { ProductoStockModule } from './stock/producto-stock.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ProductoIngresoModule,
        ProductoModule,
        ProductoSalidaModule,
        ProductoStockModule
    ],
    exports: []
})
export class AlmacenProductoModule {

}
