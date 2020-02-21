import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionTipoCategoriaService } from '../administracion-tipocategoria.service';
import { TipoCategoriaResponse } from '../models/tipocategoria.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { TipoCategoriaRequest } from '../models/tipocategoria.request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';


@Component({
    selector: 'app-tipocategoria-registro',
    templateUrl: './tipocategoria-registro.component.html',
    styleUrls: ['./tipocategoria-registro.component.scss'],
    providers: [
      AdministracionTipoCategoriaService,
      PaneraUtils,
    ]
  })
export class TipoCategoriaRegistroComponent {

  public tipoCategoria: TipoCategoriaResponse;
  public tipoCategoriaRequest: TipoCategoriaRequest;

  constructor(private router: Router,
              private tipoCategoriaService: AdministracionTipoCategoriaService,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal) {
    this.cargarTipoCategoria();

  }

  cancelar() {
    this.router.navigate(['administracion/tipocategoria']);
  }

  cargarTipoCategoria() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idTipoCategoria') !== undefined) {
      const idTipoCategoria = +this.paneraUtils.obtenerGet('idTipoCategoria');
      this.tipoCategoriaService.obtenerTipoCategoria(idTipoCategoria).subscribe(
        data => {
          if (data.success) {
            this.tipoCategoria = data.result;
            console.log(this.tipoCategoria);
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Tipo categoría');
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
      this.tipoCategoria = new TipoCategoriaResponse();
      this.tipoCategoria.id = 0;
      this.tipoCategoria.tipo = '';
      this.tipoCategoria.nombre = '';
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  guardarTipoCategoria(successModal: any) {
    console.log("avlida " + this.validarCampos());
    if (this.validarCampos()) {
      this.tipoCategoriaRequest = new TipoCategoriaRequest();
      this.tipoCategoriaRequest.nombre = this.tipoCategoria.nombre;
      this.tipoCategoriaRequest.descripcion = this.tipoCategoria.descripcion;
      this.tipoCategoriaRequest.tipo = this.tipoCategoria.tipo;
      if (this.tipoCategoria.id > 0) {
        this.actualizarTipoCategoria(successModal);
      } else {
        this.registrarTipoCategoria(successModal);
      }
    }
  }

  registrarTipoCategoria(successModal: any) {
    this.tipoCategoriaService.registrarTipoCategoria(this.tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategoria = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_TIPO_CATEGORIA_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_TIPO_CATEGORIA_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.mostrarLoading(false);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_TIPO_CATEGORIA_ERROR);
      }
    );
  }

  actualizarTipoCategoria(successModal: any) {
    this.tipoCategoriaRequest.id = this.tipoCategoria.id;
    this.tipoCategoriaService.actualizarTipoCategoria(this.tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategoria = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_TIPO_CATEGORIA_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_TIPO_CATEGORIA_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_TIPO_CATEGORIA_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      });
  }

  validarCampos(): boolean {
    let cont = 0;
    if (this.tipoCategoria.tipo === '') {
      PaneraVistaUtils.invalid('tipo');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('tipo');
    }
    console.log("nombre " + this.tipoCategoria.nombre );
    if (this.tipoCategoria.nombre === '') {
      PaneraVistaUtils.invalid('nombre');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('nombre');
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

  procesaPropagar(mensaje) {
    this.tipoCategoria.nombre = mensaje;
    console.log(mensaje);
  }
}
