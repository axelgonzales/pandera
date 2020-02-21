import { InsumoIngresoModule } from './ingreso/insumo-ingreso.module';
import { InsumoModule } from './insumo/insumo.module';
import { InsumoSalidaModule } from './salida/insumo-salida.module';
import { InsumoStockModule } from './stock/insumo-stock.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/commons/directive.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        InsumoIngresoModule,
        InsumoModule,
        InsumoSalidaModule,
        InsumoStockModule,
        DirectiveModule
    ],
    exports: []
})
export class AlmacenInsumoModule {

}
