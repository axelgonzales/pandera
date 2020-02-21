import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProductoStockBandejaComponent } from './bandeja/producto-stock-bandeja.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const PRODUCTO_STOCK_COMPONENTS = [
    ProductoStockBandejaComponent,
 ];

@NgModule({
    declarations: PRODUCTO_STOCK_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: PRODUCTO_STOCK_COMPONENTS
})
export class ProductoStockModule {

}
