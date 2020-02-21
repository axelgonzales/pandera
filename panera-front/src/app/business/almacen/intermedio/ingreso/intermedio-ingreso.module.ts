import { IntermedioIngresoRegistroComponent } from './registro/intermedio-ingreso-registro.component';
import { IntermedioIngresoBandejaComponent } from './bandeja/intermedio-ingreso-bandeja.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const INTERMEDIO_INGRESO_COMPONENTS = [
    IntermedioIngresoBandejaComponent,
    IntermedioIngresoRegistroComponent
 ];

@NgModule({
    declarations: INTERMEDIO_INGRESO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: INTERMEDIO_INGRESO_COMPONENTS
})
export class IntermedioIngresoModule {

}
