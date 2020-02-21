import { Component } from '@angular/core';
import { IntermedioIngresoService } from '../intermedio-ingreso.service';
import { IntermedioIngresoResponse } from '../models/intermedio-ingreso.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { IntermedioIngresoRequest } from '../models/intermedio-ingreso.request';
import { IntermedioIngresoDetalleResponse } from '../models/intermedio-ingreso-detalle.response';
import { Router } from '@angular/router';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { IntermedioService } from '../../intermedio/intermedio.service';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-intermedio-ingreso-registro',
    templateUrl: './intermedio-ingreso-registro.component.html',
    styleUrls: ['./intermedio-ingreso-registro.component.scss'],
    providers: [
      IntermedioIngresoService,
      PaneraUtils,
      IntermedioService,
      IntermedioIngresoService,
      AdministracionParametroService,
    ]
  })
export class IntermedioIngresoRegistroComponent {

  public intermedioIngresoRequest: IntermedioIngresoRequest;
  public intermedioIngreso: IntermedioIngresoResponse;
  public ingresoIntermedios: IntermedioIngresoDetalleResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  public verBtnEnviar = false;
  public verBtnAlmacenar = false;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private intermedioIngresoService: IntermedioIngresoService) {
    this.cargarIntermedioIngreso();
    this.intermedioIngresoRequest = new IntermedioIngresoRequest();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  cargarIntermedioIngreso() {
    PaneraVistaUtils.mostrarLoading(true);
    console.log("asd",this.paneraUtils.obtenerGet('idIntermedioIngreso'));
    if (this.paneraUtils.obtenerGet('idIntermedioIngreso') !== undefined) {
      console.log("aa ",this.paneraUtils.obtenerGet('idIntermedioIngreso'));
      const idIntermedioIngreso = Number(this.paneraUtils.obtenerGet('idIntermedioIngreso'));
      this.intermedioIngresoService.obtenerIngresoIntermedio(idIntermedioIngreso).subscribe(
        data => {
          if (data.success) {
            this.intermedioIngreso = data.result;
            this.ingresoIntermedios = this.intermedioIngreso.intermedios.slice();
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
      this.intermedioIngreso = new IntermedioIngresoResponse();
      this.intermedioIngreso.intermedios = [];
      this.ingresoIntermedios = [];
      this.verBotones();
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  actualizarIntermedioIngreso(modalSuccess: any) {
    this.intermedioIngresoRequest.id = this.intermedioIngreso.id;
    this.intermedioIngresoService.actualizarIngresoIntermedio(this.intermedioIngresoRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedioIngreso = data.result;
          this.modalService.open(modalSuccess);
          this.verBotones();
          if (Number(this.intermedioIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ENVIADO_ALMACEN) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_INGRESO_INTERMEDIO_ENVIAR_OK);
          }
          if (Number(this.intermedioIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_INGRESO_INTERMEDIO_ALMACENADO_OK);
          }
        } else {
          console.log(data.message);
          this.modalService.open(modalSuccess);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_INGRESO_INTERMEDIO_ACTUALIZAR_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(false);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(modalSuccess);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_INGRESO_INTERMEDIO_ACTUALIZAR_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  enviarIngresoIntermedio(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioIngresoRequest = new IntermedioIngresoRequest();
    this.intermedioIngresoRequest.idEstado = PaneraEstado.ID_INGRESO_ALMACEN_ENVIADO_ALMACEN;
    this.actualizarIntermedioIngreso(modalSuccess);
  }

  almacenarIngresoIntermedio(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioIngresoRequest = new IntermedioIngresoRequest();
    this.intermedioIngresoRequest.idEstado = PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO;
    this.actualizarIntermedioIngreso(modalSuccess);
  }

  verBotones() {
    if (Number(this.intermedioIngreso.idEstado) === 0) {
      this.verBtnEnviar = false;
      this.verBtnAlmacenar = false;
    } else if (Number(this.intermedioIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_REGISTRADO) {
      this.verBtnEnviar = true;
      this.verBtnAlmacenar = false;
    } else if (Number(this.intermedioIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ENVIADO_ALMACEN) {
      this.verBtnEnviar = false;
      this.verBtnAlmacenar = true;
    } else if (Number(this.intermedioIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO) {
      this.verBtnEnviar = false;
      this.verBtnAlmacenar = false;
    }
  }


  cancelar() {
    this.router.navigate(['almacen/intermedio/ingreso']);
  }

}
