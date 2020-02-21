import { InsumoStockBandejaComponent } from './bandeja/insumo-stock-bandeja.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const INSUMO_STOCK_COMPONENTS = [
    InsumoStockBandejaComponent,
 ];

@NgModule({
    declarations: INSUMO_STOCK_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: INSUMO_STOCK_COMPONENTS
})
export class InsumoStockModule {

}
