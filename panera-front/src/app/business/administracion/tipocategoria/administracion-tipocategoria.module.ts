import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoCategoriaBandejaComponent } from './bandeja/tipocategoria-bandeja.component';
import { TipoCategoriaRegistroComponent } from './registro/tipocategoria-registro.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';

@NgModule({
    declarations: [
        TipoCategoriaBandejaComponent,
        TipoCategoriaRegistroComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule
    ],
    exports: [
        TipoCategoriaBandejaComponent,
        TipoCategoriaRegistroComponent,
    ]
})

export class AdministracionTipoCategoriaModule {

}
