import { InsumoIngresoBandejaComponent } from './bandeja/insumo-ingreso-bandeja.component';
import { InsumoIngresoRegistroComponent } from './registro/insumo-ingreso-registro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';

const INSUMO_INGRESO_COMPONENTS = [
    InsumoIngresoBandejaComponent,
    InsumoIngresoRegistroComponent,
 ];

@NgModule({
    declarations: INSUMO_INGRESO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule
    ],
    exports: INSUMO_INGRESO_COMPONENTS
})
export class InsumoIngresoModule {

}
