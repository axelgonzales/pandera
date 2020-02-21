import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FamiliaBandejaComponent } from './bandeja/familia-bandeja.component';
import { FamiliaRegistroComponent } from './registro/familia-registro.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InputNameComponent } from 'src/app/commons/input-name/input-name.component';

@NgModule({
    declarations: [
        FamiliaBandejaComponent,
        FamiliaRegistroComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    exports: [
        FamiliaBandejaComponent,
        FamiliaRegistroComponent
    ]
})

export class AdministracionFamiliaModule {

}
