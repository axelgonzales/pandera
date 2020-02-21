import { AdministracionParametroService } from '../administracion-parametro.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ParametroResponse } from '../models/parametro.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { ParametroRequest } from '../models/parametro.request';
import { AdministracionTipoParametroService } from '../../tipoparametro/administracion-tipo-parametro.service';
import { TipoParametroRequest } from '../../tipoparametro/models/tipo-parametro.request';
import { TipoParametroResponse } from '../../tipoparametro/models/tipo-parametro.response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-parametro-registro',
    templateUrl: './parametro-registro.component.html',
    styleUrls: ['./parametro-registro.component.scss'],
    providers: [
      AdministracionParametroService,
      PaneraUtils,
      AdministracionTipoParametroService,
    ]
  })

export class ParametroRegistroComponent {
  closeResult: string;

  public parametro: ParametroResponse;
  public parametros: ParametroResponse[];
  public parametroRequest: ParametroRequest;
  public tipoParametros: TipoParametroResponse[];

  public idTipo = 0;

  constructor(private router: Router,
              private parametroService: AdministracionParametroService,
              private tipoParametroService: AdministracionTipoParametroService,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal) {
    this.cargarParametro();
    this.parametroRequest = new ParametroRequest();
  }

  listarTipoParametros() {
    const tipoParametroRequest = new TipoParametroRequest();
    tipoParametroRequest.nombre = '';
    this.tipoParametroService.listarTipoParametros(tipoParametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoParametros = data.result;
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

  cargarParametro() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idParametro') !== undefined) {
      const idParametro = Number(this.paneraUtils.obtenerGet('idParametro'));
      this.parametroService.obtenerParametro(idParametro).subscribe(
        data => {
          if (data.success) {
            this.parametro = data.result;
            PaneraVistaUtils.changeValue('Actualizar Parametro');
          } else {
            console.log(data.message);
          }
          this.listarTipoParametros();
        },
        err => {
          console.log(err);
          PaneraVistaUtils.mostrarLoading(false);
        }
      );
    } else {
      this.parametro = new ParametroResponse();
      this.parametro.idTipo = 0;
      this.listarTipoParametros();
    }
  }

  guardarParametro(content1: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.parametroRequest.idTipo = this.parametro.idTipo;
      this.parametroRequest.nombre = this.parametro.nombre;
      this.parametroRequest.descripcion = this.parametro.descripcion;
      if (this.parametro.id === 0) {
        this.parametroService.registrarParametro(this.parametroRequest).subscribe(
          data => {
            if (data.success) {
              this.parametro = data.result;
              this.modalService.open(content1);
              PaneraVistaUtils.changeValue('Actualizar Parametro');
              PaneraVistaUtils.showSuccess('Se registró correctamente el parametro.');
            } else {
              console.log(data.message);
              this.modalService.open(content1);
              PaneraVistaUtils.showError('No se pudo registrar el parametro.');
            }
            PaneraVistaUtils.mostrarLoading(false);
          },
          err => {
            console.log(err);
            this.modalService.open(content1);
            PaneraVistaUtils.showError('Ocurrio un error al registrar el parametro.');
            PaneraVistaUtils.mostrarLoading(false);
          }
        );
      } else {
        this.parametroRequest.id = this.parametro.id;
        this.parametroService.actualizarParametro(this.parametroRequest).subscribe(
          data => {
            if (data.success) {
              this.parametro = data.result;
              this.modalService.open(content1);
              PaneraVistaUtils.showSuccess('Se actualizó correctamente el parametro.');
            } else {
              console.log(data.message);
              this.modalService.open(content1);
              PaneraVistaUtils.showError('No se pudo actualizar el parametro.');
            }
            PaneraVistaUtils.mostrarLoading(false);
          },
          err => {
            console.log(err);
            PaneraVistaUtils.showError('Ocurrio un error al registrar el parametro.');
            PaneraVistaUtils.mostrarLoading(false);
          }
        );
      }
    }
  }

  validarCampos(): boolean {
    let esValido = true;
    console.log(this.parametro.idTipo);
    if (String(this.parametro.idTipo) === '0') {
      PaneraVistaUtils.invalid('cmbTipoParametro');
      esValido = false;
    }
    if (this.parametro.nombre === '') {
      PaneraVistaUtils.invalid('txtNombre');
      esValido = false;
    }
    return esValido;
  }

  validarCampo(campo: any) {
    if (campo.value === '0' || campo.value === '') {
      // PaneraVistaUtils.invalid(campo.name);
      console.log('Campo Validado');
    } else {
      PaneraVistaUtils.valid(campo.name);
    }
  }

  cancelar() {
    this.router.navigate(['administracion/parametro']);
  }

}
