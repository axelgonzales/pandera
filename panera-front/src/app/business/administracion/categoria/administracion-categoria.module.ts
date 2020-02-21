import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaRegistroComponent } from './registro/categoria-registro.component';
import { CategoriaBandejaComponent } from './bandeja/categoria-bandeja.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InputNameComponent } from 'src/app/commons/input-name/input-name.component';
import { DirectiveModule } from 'src/app/commons/directive.module';

@NgModule({
    declarations: [
        CategoriaBandejaComponent,
        CategoriaRegistroComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule
    ],
    exports: [
        CategoriaBandejaComponent,
        CategoriaRegistroComponent,
    ]
})

export class AdministracionCategoriaModule {

}
