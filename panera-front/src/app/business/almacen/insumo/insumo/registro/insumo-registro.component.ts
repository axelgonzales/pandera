import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InsumoService } from '../insumo.service';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { InsumoResponse } from '../models/insumo.response';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { UnidadMedidaResponse } from 'src/app/business/administracion/unidadmedida/models/unidad-medida.response';
import { AdministracionUnidadMedidaService } from 'src/app/business/administracion/unidadmedida/administracion-unidadi-medida.service';
import { UnidadMedidaRequest } from 'src/app/business/administracion/unidadmedida/models/unidad-medida.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { InsumoRequest } from '../models/insumo.request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-insumo-registro',
    templateUrl: './insumo-registro.component.html',
    styleUrls: ['./insumo-registro.component.scss'],
    providers: [
      InsumoService,
      PaneraUtils,
      NgbModal,
      AdministracionCategoriaService,
      AdministracionUnidadMedidaService,
      AdministracionTipoCategoriaService,
      AdministracionParametroService,
    ]
  })
export class InsumoRegistroComponent {

  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];
  public unidadMedidas: UnidadMedidaResponse[];
  public insumo: InsumoResponse;
  public insumoRequest: InsumoRequest;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private insumoService: InsumoService,
              private categoriaService: AdministracionCategoriaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService,
              private unidadMedidaService: AdministracionUnidadMedidaService,
              private parametroService: AdministracionParametroService) {
    this.cargarInsumo();
    this.listarUnidadMedida();
  }

  listarTipoCategorias() {
    const tipoCategoriaRequest = new TipoCategoriaRequest();
    tipoCategoriaRequest.tipo = 'I';
    tipoCategoriaRequest.nombre = '';
    this.tipoCategoriaService.listarTipoCategorias(tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategorias = data.result;
          this.listarUnidadMedida();
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
  }

  listarCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const categoriaRequest = new CategoriaRequest();
    categoriaRequest.nombre = '';
    categoriaRequest.idTipo = this.insumo.idTipoCategoria;
    this.categoriaService.listarCategorias(categoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.categorias = data.result;
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

  listarUnidadMedida() {
    const unidadMedidaRequest = new UnidadMedidaRequest();
    this.unidadMedidaService.listarUnidadMedidas(unidadMedidaRequest).subscribe(
      data => {
        if (data.success) {
          this.unidadMedidas = data.result;
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

  cargarInsumo() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idInsumo') !== undefined) {
      const idInsumo = +this.paneraUtils.obtenerGet('idInsumo');
      this.insumoService.obtenerInsumo(idInsumo).subscribe(
        data => {
          if (data.success) {
            this.insumo = data.result;
            this.listarTipoCategorias();
            this.listarCategorias();
            PaneraVistaUtils.changeValue('Actualizar Insumo');
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
      this.insumo = new InsumoResponse();
      this.listarTipoCategorias();
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  guardarInsumo(content1: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.insumoRequest = new InsumoRequest();
      this.insumoRequest.nombre = this.insumo.nombre;
      this.insumoRequest.descripcion = this.insumo.descripcion;
      this.insumoRequest.idCategoria = this.insumo.idCategoria;
      this.insumoRequest.idMedida = this.insumo.idMedida;
      this.insumoRequest.minimo = this.insumo.minimo;
      if (String(this.insumo.id) === '0') {
        this.insumoService.registrarInsumo(this.insumoRequest).subscribe(
          data => {
            if (data.success) {
              this.insumo = data.result;
              this.modalService.open(content1);
              PaneraVistaUtils.changeValue('Actualizar Insumo');
              PaneraVistaUtils.showSuccess('Se registro correctamente el insumo.');
            } else {
              console.log(data.message);
              PaneraVistaUtils.showError('No se pudo registrar el insumo.');
            }
            PaneraVistaUtils.mostrarLoading(false);
          },
          err => {
            console.log(err);
            PaneraVistaUtils.showError('Ocurrio un error al registrar el insumo.');
          }
        );
      } else {
        this.insumoRequest.id = this.insumo.id;
        this.insumoService.actualizarInsumo(this.insumoRequest).subscribe(
          data => {
            if (data.success) {
              this.insumo = data.result;
              this.modalService.open(content1);
              PaneraVistaUtils.showSuccess('Se actualizo correctamente el insumo.');
            } else {
              console.log(data.message);
              PaneraVistaUtils.showError('No se pudo actualizar el insumo.');
            }
            PaneraVistaUtils.mostrarLoading(false);
          },
          err => {
            console.log(err);
            PaneraVistaUtils.showError('Ocurrio un error al actualizar el insumo.');
            PaneraVistaUtils.mostrarLoading(false);
          }
        );
      }
    }
  }

  validarCampos(): boolean {
    let cant = 0;
    if (String(this.insumo.idTipoCategoria) === '0') {
      PaneraVistaUtils.invalid('idTipoCategoria');
      cant  = cant + 1;
    } else {
      PaneraVistaUtils.valid('idTipoCategoria');
    }
    if (String(this.insumo.idCategoria) === '0') {
      PaneraVistaUtils.invalid('idCategoria');
      cant  = cant + 1;
    } else {
      PaneraVistaUtils.valid('idCategoria');
    }
    if (String(this.insumo.nombre) === '') {
      PaneraVistaUtils.invalid('nombre');
      cant  = cant + 1;
    } else {
      PaneraVistaUtils.valid('nombre');
    }
    if (String(this.insumo.idMedida) === '0') {
      PaneraVistaUtils.invalid('idMedida');
      cant  = cant + 1;
    } else {
      PaneraVistaUtils.valid('idMedida');
    }
    if (String(this.insumo.minimo) === '0' || String(this.insumo.minimo) === '') {
      PaneraVistaUtils.invalid('minimo');
      cant  = cant + 1;
    } else {
      PaneraVistaUtils.valid('minimo');
    }

    if (cant > 0) {
      return false;
    } else {
      return true;
    }
  }

  limpiarCampos() {
    this.validarCampos();
  }

  cancelar() {
    this.router.navigate(['almacen/insumo/insumo']);
  }

  keyPressNumber(event: KeyboardEvent) {
    const regex = {
        string: new RegExp(/^[a-zA-Z]/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    } ;
      let value = this.insumo.minimo == undefined ? '':this.insumo.minimo.toString();
      let current: string = value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(regex['decimal'])) {
          event.preventDefault();
      }
  }

}
