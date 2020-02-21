import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionCategoriaService } from '../administracion-categoria.service';
import { CategoriaResponse } from '../models/categoria.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { CategoriaRequest } from '../models/categoria.request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionTipoCategoriaService } from '../../tipocategoria/administracion-tipocategoria.service';
import { TipoCategoriaRequest } from '../../tipocategoria/models/tipocategoria.request';
import { TipoCategoriaResponse } from '../../tipocategoria/models/tipocategoria.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-categoria-registro',
    templateUrl: './categoria-registro.component.html',
    styleUrls: ['./categoria-registro.component.scss'],
    providers: [
      AdministracionCategoriaService,
      PaneraUtils,
      AdministracionTipoCategoriaService,
    ]
  })
export class CategoriaRegistroComponent {

  closeResult: string;

  public categoria: CategoriaResponse;
  public tipoCategorias: TipoCategoriaResponse[];
  public categoriaRequest: CategoriaRequest;
  public loading: boolean;
  public verBotones: boolean;


  constructor(private router: Router,
              private categoriaService: AdministracionCategoriaService,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private tipoCategoriaService: AdministracionTipoCategoriaService) {
    this.cargarCategoria();
    this.categoriaRequest = new CategoriaRequest();
    this.listarTipoCategorias();
  }

  cargarCategoria() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idCategoria') !== undefined) {
      const idCategoria = +this.paneraUtils.obtenerGet('idCategoria');
      this.loading = true;
      this.categoriaService.obtenerCategoria(idCategoria).subscribe(
        data => {
          if (data.success) {
            this.categoria = data.result;
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Categoria');
            this.listarTipoCategorias();
          } else {
            console.log(data.message);
            PaneraVistaUtils.mostrarLoading(false);
          }
        },
        err => {
          console.log(err);
          PaneraVistaUtils.mostrarLoading(false);
        }
      );
    } else {
      this.categoria = new CategoriaResponse();
      this.categoria.id = 0;
      this.categoria.idTipo = 0;
      this.categoria.nombre = '';
      this.listarTipoCategorias();
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  listarTipoCategorias() {
    const tipoCategoriaRequest = new TipoCategoriaRequest();
    tipoCategoriaRequest.tipo = '';
    tipoCategoriaRequest.nombre = '';
    this.tipoCategoriaService.listarTipoCategorias(tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategorias = data.result;
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

  guardarCategoria(successModal: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      if (this.categoria.id > 0) {
        this.actualizarCategoria(successModal);
      } else {
        this.registrarCategoria(successModal);
      }
    }
  }

  registrarCategoria(successModal: any) {
    this.categoriaRequest.nombre = this.categoria.nombre;
    this.categoriaRequest.descripcion = this.categoria.descripcion;
    this.categoriaRequest.idTipo = this.categoria.idTipo;
    this.categoriaService.registrarCategoria(this.categoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.categoria = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_CATEGORIA_OK);
          PaneraVistaUtils.cambiarBtnGuardar('Actualizar Categoria');
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_CATEGORIA_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_CATEGORIA_ERROR);
      }
    );
  }

  actualizarCategoria(successModal: any) {
    this.categoriaRequest.id = this.categoria.id;
    this.categoriaRequest.nombre = this.categoria.nombre;
    this.categoriaRequest.descripcion = this.categoria.descripcion;
    this.categoriaRequest.idTipo = this.categoria.idTipo;
    this.categoriaService.actualizarCategoria(this.categoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.categoria = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_CATEGORIA_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_CATEGORIA_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_CATEGORIA_ERROR);
      }
    );
  }

  validarCampos(): boolean {
    let cont = 0;
    if (String(this.categoria.idTipo) === '0') {
      PaneraVistaUtils.invalid('idTipo');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('idTipo');
    }
    if (this.categoria.nombre === '') {
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

  cancelar() {
    this.router.navigate(['administracion/categoria']);
  }

}
