import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevolucionBandejaComponent } from './bandeja/devolucion-bandeja.component';
import { DevolucionRegistroComponent } from './registro/devolucion-registro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const DEVOLUCION_COMPONENTS = [
    DevolucionBandejaComponent,
    DevolucionRegistroComponent,
 ];

@NgModule({
    declarations: DEVOLUCION_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: DEVOLUCION_COMPONENTS
})

export class PedidosDevolucionModule {

}
