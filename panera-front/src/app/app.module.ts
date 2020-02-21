import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StorageServiceModule} from 'angular-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/panera-login.module';
import { HomeModule } from './home/panera-home.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaneraAdministracionModule } from './business/administracion/panera-administracion.module';
import { PaneraSeguridadModule } from './business/seguridad/panera-seguridad.module';
import { PaneraReportesModule } from './business/reportes/panera-reportes.module';
import { PaneraPedidosModule } from './business/pedidos/panera-pedidos.module';
import { PaneraComprasModule } from './business/compras/panera-compras.module';
import { PaneraAlmacenModule } from './business/almacen/panera-almacen.module';
import { PaneraRecetaModule } from './business/receta/panera-receta.module';
import { InputNameComponent } from './commons/input-name/input-name.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StorageServiceModule,
    LoginModule,
    HomeModule,
    PaneraAdministracionModule,
    PaneraPedidosModule,
    PaneraComprasModule,
    PaneraPedidosModule,
    PaneraAlmacenModule,
    PaneraReportesModule,
    PaneraSeguridadModule,
    PaneraRecetaModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
