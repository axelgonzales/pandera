import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguridadPerfilRegistroComponent } from './registro/seguridad-perfil-registro.component';
import { SeguridadPerfilBandejaComponent } from './bandeja/seguridad-perfil-bandeja.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        SeguridadPerfilBandejaComponent,
        SeguridadPerfilRegistroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    exports: [
        SeguridadPerfilBandejaComponent,
        SeguridadPerfilRegistroComponent
    ]
})

export class SeguridadPerfilModule {

}
