import { InsumoIngresoService } from '../insumo-ingreso.service';
import { Component } from '@angular/core';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { Router } from '@angular/router';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { InsumoIngresoRequest } from '../models/insumo-ingreso.request';
import { InsumoIngresoResponse } from '../models/insumo-ingreso.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-insumo-ingreso-bandeja',
    templateUrl: './insumo-ingreso-bandeja.component.html',
    styleUrls: ['./insumo-ingreso-bandeja.component.scss'],
    providers: [
      InsumoIngresoService,
      AdministracionEstadoService,
      AdministracionParametroService,
    ]
  })

export class InsumoIngresoBandejaComponent {

  public idTipoIngreso = 0;
  public idEstado = 0;
  public fecha;

  public estados: EstadoResponse[];
  public tipoIngresos: ParametroResponse[];
  public insumoIngresos: InsumoIngresoResponse[];
  public insumoIngresoRequest: InsumoIngresoRequest;

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router,
              private insumoIngresoService: InsumoIngresoService,
              private estadoService: AdministracionEstadoService,
              private parametroService: AdministracionParametroService) {
    this.inBusqueda = false;
    this.fecha = PaneraUtils.obtenerFechaHoyView();
    this.insumoIngresoRequest = new InsumoIngresoRequest();
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
        } else{
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

  listarIngresoInsumos() {
    PaneraVistaUtils.mostrarLoading(true);
    this.insumoIngresoRequest.idTipo = this.idTipoIngreso;
    this.insumoIngresoRequest.idEstado = this.idEstado;
    this.insumoIngresoRequest.fecha = PaneraUtils.obtenerFecha(this.fecha);
    this.insumoIngresoService.listarIngresoInsumos(this.insumoIngresoRequest).subscribe(
      data => {
        if (data.success) {
          this.insumoIngresos = data.result;
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

  editarIngresoInsumo(idInsumoIngreso: number) {
    location.href = '#/almacen/insumo/ingreso/registro?idInsumoIngreso=' + idInsumoIngreso;
  }

  agregarIngresoInsumo() {
    this.router.navigate(['almacen/insumo/ingreso/registro']);
  }

}
