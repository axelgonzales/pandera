import { Component, Inject } from '@angular/core';
import { IntermedioSalidaService } from '../intermedio-salida.service';
import { IntermedioSalidaResponse } from '../models/intermedio-salida.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { LoginResponse } from 'src/app/login/model/panera-login.response';
import { IntermedioSalidaRequest } from '../models/intermedio-salida.request';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { IntermedioSalidaDetalleResponse } from '../models/intermedio-salida-detalle.response';
import { Router } from '@angular/router';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { IntermedioService } from '../../intermedio/intermedio.service';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { IntermedioSalidaDetalleRequest } from '../models/intermedio-salida-detalle.request';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-intermedio-salida-registro',
    templateUrl: './intermedio-salida-registro.component.html',
    styleUrls: ['./intermedio-salida-registro.component.scss'],
    providers: [
      IntermedioSalidaService,
      PaneraUtils,
      IntermedioService,
      IntermedioSalidaService,
      AdministracionParametroService,
    ]
  })
export class IntermedioSalidaRegistroComponent {

  public intermedioSalidaRequest: IntermedioSalidaRequest;
  public intermedioSalida: IntermedioSalidaResponse;
  public salidaIntermedios: IntermedioSalidaDetalleResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  public verBtnSolicitar = false;
  public verBtnDespachar = false;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private intermedioSalidaService: IntermedioSalidaService,
              private parametroService: AdministracionParametroService) {
    this.cargarIntermedioSalida();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  cargarIntermedioSalida() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idIntermedioSalida') !== undefined) {
      const idIntermedioSalida = Number(this.paneraUtils.obtenerGet('idIntermedioSalida'));
      this.intermedioSalidaService.obtenerSalidaIntermedio(idIntermedioSalida).subscribe(
        data => {
          if (data.success) {
            this.intermedioSalida = data.result;
            this.salidaIntermedios = this.intermedioSalida.intermedios.slice();
            this.verBotones();
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
    } else {
      this.intermedioSalida = new IntermedioSalidaResponse();
      this.intermedioSalida.intermedios = [];
      this.salidaIntermedios = [];
      this.verBotones();
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  actualizarIntermedioSalida(modalSuccess: any) {
    this.intermedioSalidaRequest.id = this.intermedioSalida.id;
    this.intermedioSalidaService.actualizarSalidaIntermedio(this.intermedioSalidaRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedioSalida = data.result;
          this.modalService.open(modalSuccess);
          this.verBotones();
          if (Number(this.intermedioSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_POR_DESPACHAR) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_SOLICITAR_OK);
          }
          if (Number(this.intermedioSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_DESPACHADO) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_DESPACHADO_OK);
          }
        } else {
          console.log(data.message);
          this.modalService.open(modalSuccess);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_ACTUALIZAR_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(false);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(modalSuccess);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_ACTUALIZAR_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  solicitarIntermedioSalida(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioSalidaRequest = new IntermedioSalidaRequest();
    this.intermedioSalidaRequest.idEstado = PaneraEstado.ID_SALIDA_ALMACEN_POR_DESPACHAR;
    this.actualizarIntermedioSalida(modalSuccess);
  }

  despacharIntermedioSalida(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioSalidaRequest = new IntermedioSalidaRequest();
    this.intermedioSalidaRequest.idEstado = PaneraEstado.ID_SALIDA_ALMACEN_DESPACHADO;
    this.actualizarIntermedioSalida(modalSuccess);
  }

  verBotones() {
    if (Number(this.intermedioSalida.idEstado) === 0) {
      this.verBtnSolicitar = false;
      this.verBtnDespachar = false;
    } else if (Number(this.intermedioSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_REGISTRADO) {
      this.verBtnSolicitar = true;
      this.verBtnDespachar = false;
    } else if (Number(this.intermedioSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_POR_DESPACHAR) {
      this.verBtnSolicitar = false;
      this.verBtnDespachar = true;
    } else if (Number(this.intermedioSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_DESPACHADO) {
      this.verBtnSolicitar = false;
      this.verBtnDespachar = false;
    }
  }


  cancelar() {
    this.router.navigate(['almacen/intermedio/salida']);
  }

}
