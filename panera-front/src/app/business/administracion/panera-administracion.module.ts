import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministracionCategoriaModule } from './categoria/administracion-categoria.module';
import { AdministracionFamiliaModule } from './familia/administracion-familia.module';
import { AdministracionParametroModule } from './parametro/administracion-parametro.module';
import { AdministracionSubFamiliaModule } from './subfamilia/administracion-subfamilia.module';
import { AdministracionTipoCategoriaModule } from './tipocategoria/administracion-tipocategoria.module';
import { AdministracionProveedorModule } from './proveedor/administracion-proveedor.module';
import { AdministracionTiendaModule } from './tienda/administracion-tienda.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        AdministracionParametroModule,
        AdministracionTipoCategoriaModule,
        AdministracionCategoriaModule,
        AdministracionFamiliaModule,
        AdministracionSubFamiliaModule,
        AdministracionProveedorModule,
        AdministracionTiendaModule,
    ],
    exports: []
})
export class PaneraAdministracionModule {

}
