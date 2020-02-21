import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteInsumoComponent } from './insumo/reporte-insumo.componente';

@NgModule({
    declarations: [
        ReporteInsumoComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ReporteInsumoComponent
    ]
})
export class PaneraReportesModule{

}