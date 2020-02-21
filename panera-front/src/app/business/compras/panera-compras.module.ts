import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComprasCompraModule } from './compra/compras-compra.module';
import { DirectiveModule } from 'src/app/commons/directive.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ComprasCompraModule,
        DirectiveModule
    ],
    exports: []
})
export class PaneraComprasModule {

}
