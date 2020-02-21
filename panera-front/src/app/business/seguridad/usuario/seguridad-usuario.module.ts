import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguridadUsuarioRegistroComponent } from './registro/seguridad-usuario-registro.component';
import { SeguridadUsuarioBandejaComponent } from './bandeja/seguridad-usuario-bandeja.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        SeguridadUsuarioBandejaComponent,
        SeguridadUsuarioRegistroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: [
        SeguridadUsuarioBandejaComponent,
        SeguridadUsuarioRegistroComponent
    ]
})

export class SeguridadUsuarioModule {

}
