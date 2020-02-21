import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParametroBandejaComponent } from './bandeja/parametro-bandeja.component';
import { ParametroRegistroComponent } from './registro/parametro-registro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [
        ParametroBandejaComponent,
        ParametroRegistroComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule 
    ],
    exports: [
        ParametroBandejaComponent,
        ParametroRegistroComponent,
    ]
})
export class AdministracionParametroModule {

}
