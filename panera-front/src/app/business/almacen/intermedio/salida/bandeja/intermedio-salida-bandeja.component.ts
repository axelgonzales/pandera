import { Component } from '@angular/core';
import { IntermedioSalidaService } from '../intermedio-salida.service';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { IntermedioSalidaResponse } from '../models/intermedio-salida.response';
import { IntermedioSalidaRequest } from '../models/intermedio-salida.request';
import { Router } from '@angular/router';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-intermedio-salida-bandeja',
    templateUrl: './intermedio-salida-bandeja.component.html',
    styleUrls: ['./intermedio-salida-bandeja.component.scss'],
    providers: [
      IntermedioSalidaService,
      AdministracionEstadoService,
      AdministracionParametroService,
    ]
  })
export class IntermedioSalidaBandejaComponent {

  public idTipoSalida = 0;
  public idEstado = 0;
  public numPedido = '';
  public fecha;

  public estados: EstadoResponse[];
  public tipoSalidas: ParametroResponse[];
  public intermedioSalidas: IntermedioSalidaResponse[];
  public intermedioSalidaRequest: IntermedioSalidaRequest;

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router,
              private intermedioSalidaService: IntermedioSalidaService,
              private estadoService: AdministracionEstadoService,
              private parametroService: AdministracionParametroService) {
    this.fecha = PaneraUtils.obtenerFechaHoyView();
    this.intermedioSalidaRequest = new IntermedioSalidaRequest();
    this.listarTipoSalidas();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarTipoSalidas() {
    PaneraVistaUtils.mostrarLoading(true);
    const parametroRequest = new ParametroRequest();
    parametroRequest.idTipo = PaneraTipoParametro.ID_TIPOS_SALIDA_ALMACEN;
    this.parametroService.listarParametros(parametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoSalidas = data.result;
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
    estadoRequest.idTipo = PaneraTipoEstado.ID_SALIDA_ALMACEN;
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

  buscarSalidaIntermedios() {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioSalidaRequest.idTipo = this.idTipoSalida;
    this.intermedioSalidaRequest.idEstado = this.idEstado;
    this.intermedioSalidaRequest.numPedido = this.numPedido;
    this.intermedioSalidaRequest.fecha = PaneraUtils.obtenerFecha(this.fecha);
    this.intermedioSalidaService.listarSalidaIntermedios(this.intermedioSalidaRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedioSalidas = data.result;
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

  editarSalidaIntermedio(idIntermedioSalida: number) {
    location.href = '#/almacen/intermedio/salida/registro?idIntermedioSalida=' + idIntermedioSalida;
  }

  agregarSalidaIntermedio() {
    this.router.navigate(['almacen/intermedio/salida/registro']);
  }
}
