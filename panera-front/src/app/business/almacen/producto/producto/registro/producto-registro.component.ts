import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { UnidadMedidaResponse } from 'src/app/business/administracion/unidadmedida/models/unidad-medida.response';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { ProductoResponse } from '../models/producto.response';
import { UnidadMedidaRequest } from 'src/app/business/administracion/unidadmedida/models/unidad-medida.request';
import { AdministracionUnidadMedidaService } from 'src/app/business/administracion/unidadmedida/administracion-unidadi-medida.service';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { ProductoRequest } from '../models/product.request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-producto-registro',
    templateUrl: './producto-registro.component.html',
    styleUrls: ['./producto-registro.component.scss'],
    providers: [
      ProductoService,
      PaneraUtils,
      AdministracionCategoriaService,
      AdministracionUnidadMedidaService,
      AdministracionTipoCategoriaService,
    ]
  })
export class ProductoRegistroComponent {

  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];
  public medidas: UnidadMedidaResponse[];

  public producto: ProductoResponse;
  public productoRequest: ProductoRequest;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private productoService: ProductoService,
              private categoriaService: AdministracionCategoriaService,
              private medidaService: AdministracionUnidadMedidaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService) {
    this.cargarProducto();
  }

  cargarProducto() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idProducto') !== undefined) {
      const idProducto = +this.paneraUtils.obtenerGet('idProducto');
      this.productoService.obtenerProducto(idProducto).subscribe(
        data => {
          if (data.success) {
            this.producto = data.result;
            this.listarTipoCategorias();
            this.listarCategorias();
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Producto');
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
      this.producto = new ProductoResponse();
      this.producto.id = 0;
      this.producto.nombre = '';
      this.producto.idTipoCategoria = 0;
      this.producto.idCategoria = 0;
      this.producto.idMedida = 0;
      this.listarTipoCategorias();
    }
  }

  listarTipoCategorias() {
    const tipocategoriaRequest = new TipoCategoriaRequest();
    tipocategoriaRequest.tipo = 'P';
    tipocategoriaRequest.nombre = '';
    this.tipoCategoriaService.listarTipoCategorias(tipocategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategorias = data.result;
          this.listarMedidas();
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

  listarCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const categoriaRequest = new CategoriaRequest();
    categoriaRequest.nombre = '';
    categoriaRequest.idTipo = this.producto.idTipoCategoria;
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

  guardarProducto(successModal: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.productoRequest = new ProductoRequest();
      this.productoRequest.idCategoria = this.producto.idCategoria;
      this.productoRequest.idMedida = this.producto.idMedida;
      this.productoRequest.nombre = this.producto.nombre;
      this.productoRequest.descripcion = this.producto.descripcion;
      if (this.producto.id > 0) {
        this.productoRequest.id = this.producto.id;
        this.actualizarProducto(successModal);
      } else {
        this.registrarProducto(successModal);
      }
    }
  }

  registrarProducto(successModal: any) {
    this.productoService.registrarProducto(this.productoRequest).subscribe(
      data => {
        if (data.success) {
          this.producto = data.result;
          PaneraVistaUtils.cambiarBtnGuardar('Actualizar Producto');
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_PRODUCTO_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_PRODUCTO_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_PRODUCTO_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  actualizarProducto(successModal: any) {
    this.productoService.actualizarProducto(this.productoRequest).subscribe(
      data => {
        if (data.success) {
          this.producto = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_PRODUCTO_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_PRODUCTO_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_PRODUCTO_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  validarCampos(): boolean {
    let cont = 0;
    if (String(this.producto.idTipoCategoria) === '0') {
      PaneraVistaUtils.invalid('idTipoCategoria');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('idTipoCategoria');
    }

    if (String(this.producto.idCategoria) === '0') {
      PaneraVistaUtils.invalid('idCategoria');
      cont  = cont + 1;
    } else {
      PaneraVistaUtils.valid('idCategoria');
    }

    if (this.producto.nombre === '') {
      PaneraVistaUtils.invalid('nombre');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('nombre');
    }

    if (String(this.producto.idMedida) === '0') {
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
    this.router.navigate(['/almacen/producto/producto']);
  }

}
