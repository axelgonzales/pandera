import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoBandejaComponent } from './bandeja/pedido-bandeja.component';
import { PedidoRegistroComponent } from './registro/pedido-registro.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const PEDIDO_COMPONENTS = [
    PedidoBandejaComponent,
    PedidoRegistroComponent,
 ];

@NgModule({
    declarations: PEDIDO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    exports: PEDIDO_COMPONENTS
})

export class PedidosPedidoModule {

}
