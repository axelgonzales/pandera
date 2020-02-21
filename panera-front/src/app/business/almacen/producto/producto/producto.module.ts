import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoBandejaComponent } from './bandeja/producto-bandeja.component';
import { ProductoRegistroComponent } from './registro/producto-registro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';

const PRODUCTO_COMPONENTS = [
    ProductoBandejaComponent,
    ProductoRegistroComponent
 ];

@NgModule({
    declarations: PRODUCTO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule,
    ],
    exports: PRODUCTO_COMPONENTS
})
export class ProductoModule {

}
