import { IntermedioRegistroComponent } from './registro/intermedio-registro.component';
import { IntermedioBandejaComponent } from './bandeja/intermedio-bandeja.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';

const INTERMEDIO_COMPONENTS = [
    IntermedioBandejaComponent,
    IntermedioRegistroComponent,
 ];

@NgModule({
    declarations: INTERMEDIO_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule,
    ],
    exports: INTERMEDIO_COMPONENTS
})
export class IntermedioModule {

}
