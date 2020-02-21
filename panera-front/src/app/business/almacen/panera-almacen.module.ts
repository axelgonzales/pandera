import { AlmacenInsumoModule } from './insumo/almacen-insumo.module';
import { AlmacenIntermedioModule } from './intermedio/almacen-intermedio.module';
import { AlmacenProductoModule } from './producto/almacen-producto.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        AlmacenInsumoModule,
        AlmacenIntermedioModule,
        AlmacenProductoModule,
    ],
    exports: []
})
export class PaneraAlmacenModule {

}
