import { InsumoSalidaBandejaComponent } from './bandeja/insumo-salida-bandeja.component';
import { InsumoSalidaRegistroComponent } from './registro/insumo-salida-registro.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';

const INSUMO_SALIDA_COMPONENTS = [
    InsumoSalidaBandejaComponent,
    InsumoSalidaRegistroComponent,
 ];

@NgModule({
    declarations: INSUMO_SALIDA_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule
    ],
    exports: INSUMO_SALIDA_COMPONENTS
})
export class InsumoSalidaModule {

}
