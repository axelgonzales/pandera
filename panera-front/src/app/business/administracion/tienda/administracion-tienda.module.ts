import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiendaBandejaComponent } from './bandeja/tienda-bandeja.component';
import { TiendaRegistroComponent } from './registro/tienda-registro.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InputNameComponent } from 'src/app/commons/input-name/input-name.component';
import { DirectiveModule } from 'src/app/commons/directive.module';

const TIENDA_COMPONENTS = [
    TiendaBandejaComponent,
    TiendaRegistroComponent,
 ];

@NgModule({
    declarations: TIENDA_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule
    ],
    exports: TIENDA_COMPONENTS
})

export class AdministracionTiendaModule {

}
