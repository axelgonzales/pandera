import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosPedidoModule } from './pedido/pedidos-pedido.module';
import { PedidosDespachoModule } from './despacho/pedidos-despacho.module';
import { PedidosDevolucionModule } from './devolucion/pedidos-devolucion.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        PedidosPedidoModule,
        PedidosDespachoModule,
        PedidosDevolucionModule,
    ],
    exports: []
})
export class PaneraPedidosModule {

}
