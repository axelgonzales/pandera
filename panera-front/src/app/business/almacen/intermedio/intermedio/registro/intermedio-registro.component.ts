import { Component } from '@angular/core';
import { IntermedioService } from '../intermedio.service';
import { IntermedioResponse } from '../models/intermedio.response';
import { IntermedioRequest } from '../models/intermedio.request';
import { UnidadMedidaResponse } from 'src/app/business/administracion/unidadmedida/models/unidad-medida.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionUnidadMedidaService } from 'src/app/business/administracion/unidadmedida/administracion-unidadi-medida.service';
import { UnidadMedidaRequest } from 'src/app/business/administracion/unidadmedida/models/unidad-medida.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-intermedio-registro',
    templateUrl: './intermedio-registro.component.html',
    styleUrls: ['./intermedio-registro.component.scss'],
    providers: [
      IntermedioService,
      PaneraUtils,
      AdministracionUnidadMedidaService,
    ]
  })
export class IntermedioRegistroComponent {

  public medidas: UnidadMedidaResponse[];

  public intermedio: IntermedioResponse;
  public intermedioRequest: IntermedioRequest;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private intermedioService: IntermedioService,
              private medidaService: AdministracionUnidadMedidaService) {
    this.cargarIntermedio();
  }

  cargarIntermedio() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idIntermedio') !== undefined) {
      const idIntermedio = +this.paneraUtils.obtenerGet('idIntermedio');
      this.intermedioService.obtenerIntermedio(idIntermedio).subscribe(
        data => {
          if (data.success) {
            this.intermedio = data.result;
            this.listarMedidas();
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Intermedio');
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
      this.intermedio = new IntermedioResponse();
      this.intermedio.id = 0;
      this.intermedio.nombre = '';
      this.intermedio.idMedida = 0;
      this.listarMedidas();
    }
  }

  listarMedidas() {
    const medidaRequest = new UnidadMedidaRequest();
    this.medidaService.listarUnidadMedidas(medidaRequest).subscribe(
      data => {
        if (data.success) {
          this.medidas = data.result;
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

  guardarIntermedio(successModal: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.intermedioRequest = new IntermedioRequest();
      this.intermedioRequest.idMedida = this.intermedio.idMedida;
      this.intermedioRequest.nombre = this.intermedio.nombre;
      this.intermedioRequest.descripcion = this.intermedio.descripcion;
      if (this.intermedio.id > 0) {
        this.intermedioRequest.id = this.intermedio.id;
        this.actualizarIntermedio(successModal);
      } else {
        this.registrarIntermedio(successModal);
      }
    }
  }

  registrarIntermedio(successModal: any) {
    this.intermedioService.registrarIntermedio(this.intermedioRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedio = data.result;
          PaneraVistaUtils.cambiarBtnGuardar('Actualizar Intermedio');
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_INTERMEDIO_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_INTERMEDIO_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_INTERMEDIO_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  actualizarIntermedio(successModal: any) {
    this.intermedioService.actualizarIntermedio(this.intermedioRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedio = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_INTERMEDIO_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_INTERMEDIO_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_INTERMEDIO_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  validarCampos(): boolean {
    let cont = 0;
    if (this.intermedio.nombre === '') {
      PaneraVistaUtils.invalid('nombre');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('nombre');
    }

    if (String(this.intermedio.idMedida) === '0') {
      PaneraVistaUtils.invalid('idMedida');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('idMedida');
    }

    if (cont > 0) {
      return false;
    } else {
      return true;
    }
  }

  limpiarCampos() {
    this.validarCampos();
  }

  cancelar() {
    this.router.navigate(['/almacen/intermedio/intermedio']);
  }

}
