import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompraBandejaComponent } from './bandeja/compra-bandeja.component';
import { CompraRegistroComponent } from './registro/compra-registro.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';

const COMPRAS_COMPONENTS = [
    CompraBandejaComponent,
    CompraRegistroComponent,
 ];

@NgModule({
    declarations: COMPRAS_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule
    ],
    exports: COMPRAS_COMPONENTS
})

export class ComprasCompraModule {

}
