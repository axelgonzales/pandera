import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntermedioIngresoModule } from './ingreso/intermedio-ingreso.module';
import { IntermedioSalidaModule } from './salida/intermedio-salida.module';
import { IntermedioModule } from './intermedio/intermedio.module';
import { IntermedioStockModule } from './stock/intermedio-stock.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        IntermedioIngresoModule,
        IntermedioModule,
        IntermedioSalidaModule,
        IntermedioStockModule
    ],
    exports: []
})
export class AlmacenIntermedioModule {

}
