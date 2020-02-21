import { Component } from '@angular/core';
import { IntermedioIngresoService } from '../intermedio-ingreso.service';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { IntermedioIngresoResponse } from '../models/intermedio-ingreso.response';
import { IntermedioIngresoRequest } from '../models/intermedio-ingreso.request';
import { Router } from '@angular/router';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-intermedio-ingreso-bandeja',
    templateUrl: './intermedio-ingreso-bandeja.component.html',
    styleUrls: ['./intermedio-ingreso-bandeja.component.scss'],
    providers: [
      IntermedioIngresoService,
      AdministracionEstadoService,
      AdministracionParametroService,
    ]
  })
export class IntermedioIngresoBandejaComponent {

  public idTipoIngreso = 0;
  public idEstado = 0;
  public numPedido = '';
  public fecha;

  public estados: EstadoResponse[];
  public tipoIngresos: ParametroResponse[];
  public intermedioIngresos: IntermedioIngresoResponse[];
  public intermedioIngresoRequest: IntermedioIngresoRequest;

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router,
              private intermedioIngresoService: IntermedioIngresoService,
              private estadoService: AdministracionEstadoService,
              private parametroService: AdministracionParametroService) {
    this.fecha = PaneraUtils.obtenerFechaHoyView();
    this.intermedioIngresoRequest = new IntermedioIngresoRequest();
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

  buscarIngresoIntermedios() {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioIngresoRequest.idTipo = this.idTipoIngreso;
    this.intermedioIngresoRequest.idEstado = this.idEstado;
    this.intermedioIngresoRequest.numPedido = this.numPedido;
    this.intermedioIngresoRequest.fecha = PaneraUtils.obtenerFecha(this.fecha);
    this.intermedioIngresoService.listarIngresoIntermedios(this.intermedioIngresoRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedioIngresos = data.result;
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

  editarIngresoIntermedio(idIntermedioIngreso: number) {
    location.href = '#/almacen/intermedio/ingreso/registro?idIntermedioIngreso=' + idIntermedioIngreso;
  }

  agregarIngresoIntermedio() {
    this.router.navigate(['almacen/intermedio/ingreso/registro']);
  }

}
