import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubFamiliaBandejaComponent } from './bandeja/subfamilia-bandeja.component';
import { SubFamiliaRegistroComponent } from './registro/subfamilia-registro.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        SubFamiliaBandejaComponent,
        SubFamiliaRegistroComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    exports: [
        SubFamiliaBandejaComponent,
        SubFamiliaRegistroComponent,
    ]
})

export class AdministracionSubFamiliaModule {

}
