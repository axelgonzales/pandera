import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadPerfilModule } from './perfil/seguridad-perfil.module';
import { SeguridadUsuarioModule } from './usuario/seguridad-usuario.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        SeguridadPerfilModule,
        SeguridadUsuarioModule,
    ],
    exports: []
})

export class PaneraSeguridadModule {

}
