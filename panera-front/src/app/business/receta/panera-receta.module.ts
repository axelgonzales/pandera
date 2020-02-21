import { RecetaBandejaComponent } from './bandeja/receta-bandeja.component';
import { RecetaRegistroComponent } from './registro/receta-registro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectiveModule } from 'src/app/commons/directive.module';
import { DemoMaterialModule } from 'src/app/material.module';
import { ModalInsumoComponent } from './models/modal-insumo/modal-insumo.component';
import { ModalIntermedioComponent } from './models/modal-intermedio/modal-intermedio.component';
import { IntermedioService } from '../almacen/intermedio/intermedio/intermedio.service';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraRecetaService } from './panera-receta-service';
import { InsumoService } from '../almacen/insumo/insumo/insumo.service';

const RECETA_COMPONENTS = [
    RecetaBandejaComponent,
    RecetaRegistroComponent,
    ModalInsumoComponent,
    ModalIntermedioComponent
 ];

@NgModule({
    declarations: RECETA_COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule,
        DemoMaterialModule
    ],
    providers: [
        IntermedioService,
        PaneraUtils,
        PaneraRecetaService,
        InsumoService,
      ],
    entryComponents: [ModalIntermedioComponent,ModalInsumoComponent],
    exports: RECETA_COMPONENTS
})
export class PaneraRecetaModule {

}
