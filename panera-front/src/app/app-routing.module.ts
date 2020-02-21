import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/panera-login.component';
import { HomeComponent } from './home/panera-home.component';
import { PedidoBandejaComponent } from './business/pedidos/pedido/bandeja/pedido-bandeja.component';
import { PedidoRegistroComponent } from './business/pedidos/pedido/registro/pedido-registro.component';
import { SeguridadUsuarioBandejaComponent } from './business/seguridad/usuario/bandeja/seguridad-usuario-bandeja.component';
import { SeguridadUsuarioRegistroComponent } from './business/seguridad/usuario/registro/seguridad-usuario-registro.component';
import { SeguridadPerfilBandejaComponent } from './business/seguridad/perfil/bandeja/seguridad-perfil-bandeja.component';
import { SeguridadPerfilRegistroComponent } from './business/seguridad/perfil/registro/seguridad-perfil-registro.component';
import { ReporteInsumoComponent } from './business/reportes/insumo/reporte-insumo.componente';
import { FamiliaBandejaComponent } from './business/administracion/familia/bandeja/familia-bandeja.component';
import { FamiliaRegistroComponent } from './business/administracion/familia/registro/familia-registro.component';
import { SubFamiliaBandejaComponent } from './business/administracion/subfamilia/bandeja/subfamilia-bandeja.component';
import { ParametroRegistroComponent } from './business/administracion/parametro/registro/parametro-registro.component';
import { ParametroBandejaComponent } from './business/administracion/parametro/bandeja/parametro-bandeja.component';
import { CategoriaBandejaComponent } from './business/administracion/categoria/bandeja/categoria-bandeja.component';
import { CategoriaRegistroComponent } from './business/administracion/categoria/registro/categoria-registro.component';
import { TipoCategoriaBandejaComponent } from './business/administracion/tipocategoria/bandeja/tipocategoria-bandeja.component';
import { TipoCategoriaRegistroComponent } from './business/administracion/tipocategoria/registro/tipocategoria-registro.component';
import { SubFamiliaRegistroComponent } from './business/administracion/subfamilia/registro/subfamilia-registro.component';
import { ProveedorBandejaComponent } from './business/administracion/proveedor/bandeja/proveedor-bandeja.component';
import { ProveedorRegistroComponent } from './business/administracion/proveedor/registro/proveedor-registro.component';
import { TiendaBandejaComponent } from './business/administracion/tienda/bandeja/tienda-bandeja.component';
import { TiendaRegistroComponent } from './business/administracion/tienda/registro/tienda-registro.component';
import { CompraBandejaComponent } from './business/compras/compra/bandeja/compra-bandeja.component';
import { CompraRegistroComponent } from './business/compras/compra/registro/compra-registro.component';
import { DespachoBandejaComponent } from './business/pedidos/despacho/bandeja/despacho-bandeja.component';
import { DespachoRegistroComponent } from './business/pedidos/despacho/registro/despacho-registro.component';
import { DevolucionBandejaComponent } from './business/pedidos/devolucion/bandeja/devolucion-bandeja.component';
import { DevolucionRegistroComponent } from './business/pedidos/devolucion/registro/devolucion-registro.component';
import { InsumoBandejaComponent } from './business/almacen/insumo/insumo/bandeja/insumo-bandeja.component';
import { InsumoRegistroComponent } from './business/almacen/insumo/insumo/registro/insumo-registro.component';
import { InsumoIngresoBandejaComponent } from './business/almacen/insumo/ingreso/bandeja/insumo-ingreso-bandeja.component';
import { InsumoIngresoRegistroComponent } from './business/almacen/insumo/ingreso/registro/insumo-ingreso-registro.component';
import { InsumoSalidaBandejaComponent } from './business/almacen/insumo/salida/bandeja/insumo-salida-bandeja.component';
import { InsumoSalidaRegistroComponent } from './business/almacen/insumo/salida/registro/insumo-salida-registro.component';
import { InsumoStockBandejaComponent } from './business/almacen/insumo/stock/bandeja/insumo-stock-bandeja.component';
import { IntermedioBandejaComponent } from './business/almacen/intermedio/intermedio/bandeja/intermedio-bandeja.component';
import { IntermedioRegistroComponent } from './business/almacen/intermedio/intermedio/registro/intermedio-registro.component';
import { IntermedioIngresoBandejaComponent } from './business/almacen/intermedio/ingreso/bandeja/intermedio-ingreso-bandeja.component';
import { IntermedioIngresoRegistroComponent } from './business/almacen/intermedio/ingreso/registro/intermedio-ingreso-registro.component';
import { IntermedioSalidaBandejaComponent } from './business/almacen/intermedio/salida/bandeja/intermedio-salida-bandeja.component';
import { IntermedioSalidaRegistroComponent } from './business/almacen/intermedio/salida/registro/intermedio-salida-registro.component';
import { IntermedioStockBandejaComponent } from './business/almacen/intermedio/stock/bandeja/intermedio-stock-bandeja.component';
import { ProductoBandejaComponent } from './business/almacen/producto/producto/bandeja/producto-bandeja.component';
import { ProductoRegistroComponent } from './business/almacen/producto/producto/registro/producto-registro.component';
import { ProductoIngresoBandejaComponent } from './business/almacen/producto/ingreso/bandeja/producto-ingreso-bandeja.component';
import { ProductoIngresoRegistroComponent } from './business/almacen/producto/ingreso/registro/producto-ingreso-registro.component';
import { ProductoSalidaBandejaComponent } from './business/almacen/producto/salida/bandeja/producto-salida-bandeja.component';
import { ProductoSalidaRegistroComponent } from './business/almacen/producto/salida/registro/producto-salida-registro.component';
import { ProductoStockBandejaComponent } from './business/almacen/producto/stock/bandeja/producto-stock-bandeja.component';
import { RecetaBandejaComponent } from './business/receta/bandeja/receta-bandeja.component';
import { RecetaRegistroComponent } from './business/receta/registro/receta-registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'administracion/parametro', component: ParametroBandejaComponent },
  { path: 'administracion/parametro/registro', component: ParametroRegistroComponent },
  { path: 'administracion/categoria', component: CategoriaBandejaComponent },
  { path: 'administracion/categoria/registro', component: CategoriaRegistroComponent },
  { path: 'administracion/tipocategoria', component: TipoCategoriaBandejaComponent },
  { path: 'administracion/tipocategoria/registro', component: TipoCategoriaRegistroComponent },
  { path: 'administracion/familia', component: FamiliaBandejaComponent },
  { path: 'administracion/familia/registro', component: FamiliaRegistroComponent },
  { path: 'administracion/subfamilia', component: SubFamiliaBandejaComponent },
  { path: 'administracion/subfamilia/registro', component: SubFamiliaRegistroComponent },
  { path: 'administracion/proveedor', component: ProveedorBandejaComponent },
  { path: 'administracion/proveedor/registro', component: ProveedorRegistroComponent },
  { path: 'administracion/tienda', component: TiendaBandejaComponent },
  { path: 'administracion/tienda/registro', component: TiendaRegistroComponent },
  { path: 'compras/compra', component: CompraBandejaComponent },
  { path: 'compras/compra/registro', component: CompraRegistroComponent },
  { path: 'pedidos/pedido', component: PedidoBandejaComponent },
  { path: 'pedidos/pedido/registro', component: PedidoRegistroComponent },
  { path: 'pedidos/despacho', component: DespachoBandejaComponent },
  { path: 'pedidos/despacho/registro', component: DespachoRegistroComponent },
  { path: 'pedidos/devolucion', component: DevolucionBandejaComponent },
  { path: 'pedidos/devolucion/registro', component: DevolucionRegistroComponent },
  { path: 'seguridad/usuario', component: SeguridadUsuarioBandejaComponent },
  { path: 'seguridad/usuario/registro', component: SeguridadUsuarioRegistroComponent },
  { path: 'seguridad/perfil', component: SeguridadPerfilBandejaComponent },
  { path: 'seguridad/perfil/registro', component: SeguridadPerfilRegistroComponent },
  { path: 'almacen/insumo/insumo', component:  InsumoBandejaComponent },
  { path: 'almacen/insumo/insumo/registro', component:  InsumoRegistroComponent },
  { path: 'almacen/insumo/ingreso', component:  InsumoIngresoBandejaComponent },
  { path: 'almacen/insumo/ingreso/registro', component:  InsumoIngresoRegistroComponent },
  { path: 'almacen/insumo/salida', component:  InsumoSalidaBandejaComponent },
  { path: 'almacen/insumo/salida/registro', component:  InsumoSalidaRegistroComponent },
  { path: 'almacen/insumo/stock', component:  InsumoStockBandejaComponent },
  { path: 'almacen/intermedio/intermedio', component: IntermedioBandejaComponent },
  { path: 'almacen/intermedio/intermedio/registro', component: IntermedioRegistroComponent },
  { path: 'almacen/intermedio/ingreso', component: IntermedioIngresoBandejaComponent },
  { path: 'almacen/intermedio/ingreso/registro', component: IntermedioIngresoRegistroComponent },
  { path: 'almacen/intermedio/salida', component: IntermedioSalidaBandejaComponent },
  { path: 'almacen/intermedio/salida/registro', component: IntermedioSalidaRegistroComponent },
  { path: 'almacen/intermedio/stock', component: IntermedioStockBandejaComponent },
  { path: 'almacen/producto/producto', component: ProductoBandejaComponent },
  { path: 'almacen/producto/producto/registro', component: ProductoRegistroComponent },
  { path: 'almacen/producto/ingreso', component: ProductoIngresoBandejaComponent },
  { path: 'almacen/producto/ingreso/registro', component: ProductoIngresoRegistroComponent },
  { path: 'almacen/producto/salida', component: ProductoSalidaBandejaComponent },
  { path: 'almacen/producto/salida/registro', component: ProductoSalidaRegistroComponent },
  { path: 'almacen/producto/stock', component: ProductoStockBandejaComponent },
  { path: 'receta', component: RecetaBandejaComponent },
  { path: 'receta/registro', component: RecetaRegistroComponent },
  { path: 'reporte/insumo', component: ReporteInsumoComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false , useHash : true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
