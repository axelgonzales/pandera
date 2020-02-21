import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProveedorBandejaComponent } from './bandeja/proveedor-bandeja.component';
import { ProveedorRegistroComponent } from './registro/proveedor-registro.component';
import { DirectiveModule } from 'src/app/commons/directive.module';

@NgModule({
    declarations: [
        ProveedorBandejaComponent,
        ProveedorRegistroComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DirectiveModule
    ],
    exports: [
        ProveedorBandejaComponent,
        ProveedorRegistroComponent,
    ]
})

export class AdministracionProveedorModule {
    
}
