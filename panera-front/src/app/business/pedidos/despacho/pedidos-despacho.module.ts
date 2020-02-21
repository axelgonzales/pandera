import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DespachoBandejaComponent } from './bandeja/despacho-bandeja.component';
import { DespachoRegistroComponent } from './registro/despacho-registro.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const DESPACHO_COMPONENTS = [
    DespachoBandejaComponent,
    DespachoRegistroComponent,
 ];

@NgModule({
    declarations: DESPACHO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: DESPACHO_COMPONENTS
})

export class PedidosDespachoModule {

}
