import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IntermedioStockBandejaComponent } from './bandeja/intermedio-stock-bandeja.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const INTERMEDIO_STOCK_COMPONENTS = [
    IntermedioStockBandejaComponent,
 ];

@NgModule({
    declarations: INTERMEDIO_STOCK_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: INTERMEDIO_STOCK_COMPONENTS
})
export class IntermedioStockModule {

}
