import { Component } from '@angular/core';
import { ProductoIngresoService } from '../producto-ingreso.service';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { ProductoIngresoResponse } from '../models/producto-ingreso.response';
import { ProductoIngresoRequest } from '../models/producto-ingreso.request';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { Router } from '@angular/router';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-producto-ingreso-bandeja',
    templateUrl: './producto-ingreso-bandeja.component.html',
    styleUrls: ['./producto-ingreso-bandeja.component.scss'],
    providers: [
      ProductoIngresoService,
      AdministracionEstadoService,
      AdministracionParametroService,
    ]
  })
export class ProductoIngresoBandejaComponent {

  public idTipoIngreso = 0;
  public idEstado = 0;
  public numPedido = '';
  public fecha;

  public estados: EstadoResponse[];
  public tipoIngresos: ParametroResponse[];
  public productoIngresos: ProductoIngresoResponse[];
  public productoIngresoRequest: ProductoIngresoRequest;

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public loading: boolean;

  constructor(private router: Router,
              private productoIngresoService: ProductoIngresoService,
              private estadoService: AdministracionEstadoService,
              private parametroService: AdministracionParametroService) {
    this.fecha = PaneraUtils.obtenerFechaHoyView();
    this.productoIngresoRequest = new ProductoIngresoRequest();
    this.listarTipoIngresos();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarTipoIngresos() {
    PaneraVistaUtils.mostrarLoading(true);
    const parametroRequest = new ParametroRequest();
    parametroRequest.idTipo = PaneraTipoParametro.ID_TIPOS_INGRESO_ALMACEN;
    this.parametroService.listarParametros(parametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoIngresos = data.result;
          this.listarEstados();
        } else {
          console.log(data.message);
        }
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  listarEstados() {
    const estadoRequest = new EstadoRequest();
    estadoRequest.idTipo = PaneraTipoEstado.ID_INGRESO_ALMACEN;
    this.estadoService.listarEstados(estadoRequest).subscribe(
      data => {
        if (data.success) {
          this.estados = data.result;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  buscarIngresoProductos() {
    PaneraVistaUtils.mostrarLoading(true);
    this.productoIngresoRequest.idTipo = this.idTipoIngreso;
    this.productoIngresoRequest.idEstado = this.idEstado;
    this.productoIngresoRequest.numPedido = this.numPedido;
    this.productoIngresoRequest.fechaIngreso = PaneraUtils.obtenerFecha(this.fecha);
    this.productoIngresoService.listarIngresoProductos(this.productoIngresoRequest).subscribe(
      data => {
        if (data.success) {
          this.productoIngresos = data.result;
          this.inBusqueda = true;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  editarIngresoProducto(idProductoIngreso: number) {
    location.href = '#/almacen/producto/ingreso/registro?idProductoIngreso=' + idProductoIngreso;
  }

  agregarIngresoProducto() {
    this.router.navigate(['almacen/producto/ingreso/registro']);
  }
}
