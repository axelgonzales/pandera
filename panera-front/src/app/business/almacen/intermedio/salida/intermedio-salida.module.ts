import { IntermedioSalidaRegistroComponent } from './registro/intermedio-salida-registro.component';
import { IntermedioSalidaBandejaComponent } from './bandeja/intermedio-salida-bandeja.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const INTERMEDIO_SALIDA_COMPONENTS = [
    IntermedioSalidaBandejaComponent,
    IntermedioSalidaRegistroComponent,
 ];

@NgModule({
    declarations: INTERMEDIO_SALIDA_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: INTERMEDIO_SALIDA_COMPONENTS
})
export class IntermedioSalidaModule {

}
