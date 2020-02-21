import { Component } from '@angular/core';
import { InsumoSalidaService } from '../insumo-salida.service';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { Router } from '@angular/router';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { InsumoSalidaRequest } from '../models/insumo-salida.request';
import { InsumoSalidaResponse } from '../models/insumo-salida.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-insumo-salida-bandeja',
    templateUrl: './insumo-salida-bandeja.component.html',
    styleUrls: ['./insumo-salida-bandeja.component.scss'],
    providers: [
      InsumoSalidaService,
      AdministracionEstadoService,
      AdministracionParametroService,
    ]
  })
export class InsumoSalidaBandejaComponent {

  public idTipoSalida = 0;
  public idEstado = 0;
  public numPedido = '';
  public fecha;

  public tipoSalidas: ParametroResponse[];
  public insumoSalidas: InsumoSalidaResponse[];
  public insumoSalidaRequest: InsumoSalidaRequest;
  public estados: EstadoResponse[];

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router,
              private insumoSalidaService: InsumoSalidaService,
              private estadoService: AdministracionEstadoService,
              private parametroService: AdministracionParametroService) {
    this.fecha = PaneraUtils.obtenerFechaHoyView();
    this.insumoSalidaRequest = new InsumoSalidaRequest();
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
          this.inBusqueda = true;
          this.listarEstados();
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
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

  listarSalidaInsumos() {
    PaneraVistaUtils.mostrarLoading(true);
    this.insumoSalidaRequest.idTipo = Number(this.idTipoSalida);
    this.insumoSalidaRequest.numPedido = this.numPedido;
    this.insumoSalidaRequest.idEstado = Number(this.idEstado);
    this.insumoSalidaService.listarSalidaInsumos(this.insumoSalidaRequest).subscribe(
      data => {
        if (data.success) {
          this.insumoSalidas = data.result;
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

  editarSalidaInsumo(idInsumoSalida: number) {
    location.href = '#/almacen/insumo/salida/registro?idInsumoSalida=' + idInsumoSalida;
  }

  agregarSalidaInsumo() {
    this.router.navigate(['almacen/insumo/salida/registro']);
  }

}
