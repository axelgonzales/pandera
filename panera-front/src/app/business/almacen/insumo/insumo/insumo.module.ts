import { NgModule } from '@angular/core';
import { InsumoBandejaComponent } from './bandeja/insumo-bandeja.component';
import { InsumoRegistroComponent } from './registro/insumo-registro.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';

const INSUMO_COMPONENTS = [
    InsumoBandejaComponent,
    InsumoRegistroComponent,
 ];

@NgModule({
    declarations: INSUMO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule,
    ],
    exports: INSUMO_COMPONENTS
})
export class InsumoModule {

}
