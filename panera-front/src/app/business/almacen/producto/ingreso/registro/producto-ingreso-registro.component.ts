import { Component, Inject } from '@angular/core';
import { ProductoIngresoService } from '../producto-ingreso.service';
import { LoginResponse } from 'src/app/login/model/panera-login.response';
import { ProductoResponse } from '../../producto/models/producto.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { ProductoIngresoRequest } from '../models/producto-ingreso.request';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { ProductoIngresoDetalleResponse } from '../models/producto-ingreso-detalle.response';
import { ProductoIngresoResponse } from '../models/producto-ingreso.response';
import { Router } from '@angular/router';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { ProductoService } from '../../producto/producto.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { ProductoRequest } from '../../producto/models/product.request';
import { ProductoIngresoDetalleRequest } from '../models/producto-ingreso-detalle.request';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-producto-ingreso-registro',
    templateUrl: './producto-ingreso-registro.component.html',
    styleUrls: ['./producto-ingreso-registro.component.scss'],
    providers: [
      ProductoIngresoService,
      PaneraUtils,
      ProductoService,
      AdministracionCategoriaService,
      AdministracionTipoCategoriaService,
      AdministracionParametroService,
    ]
  })
export class ProductoIngresoRegistroComponent {


  public productoIngresoRequest: ProductoIngresoRequest;
  public productoIngreso: ProductoIngresoResponse;
  public ingresoProductos: ProductoIngresoDetalleResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  public verBtnEnviar = false;
  public verBtnAlmacenar = false;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              @Inject(LOCAL_STORAGE) private storage,
              private productoIngresoService: ProductoIngresoService,
              private productoService: ProductoService,
              private categoriaService: AdministracionCategoriaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService,
              private parametroService: AdministracionParametroService) {
    this.cargarProductoIngreso();
    this.productoIngresoRequest = new ProductoIngresoRequest();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  cargarProductoIngreso() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idProductoIngreso') !== undefined) {
      const idProductoIngreso = Number(this.paneraUtils.obtenerGet('idProductoIngreso'));
      this.productoIngresoService.obtenerIngresoProducto(idProductoIngreso).subscribe(
        data => {
          if (data.success) {
            this.productoIngreso = data.result;
            this.ingresoProductos = this.productoIngreso.productos.slice();
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
      this.productoIngreso = new ProductoIngresoResponse();
      this.productoIngreso.productos = [];
      this.ingresoProductos = [];
      this.verBotones();
    }
  }


  actualizarProductoIngreso(modalSuccess: any) {
    this.productoIngresoRequest.id = this.productoIngreso.id;
    this.productoIngresoService.actualizarIngresoProducto(this.productoIngresoRequest).subscribe(
      data => {
        if (data.success) {
          this.productoIngreso = data.result;
          this.modalService.open(modalSuccess);
          this.verBotones();
          if (Number(this.productoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ENVIADO_ALMACEN) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_INGRESO_PRODUCTO_ENVIAR_OK);
          }
          if (Number(this.productoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_INGRESO_PRODUCTO_ALMACENADO_OK);
          }
        } else {
          console.log(data.message);
          this.modalService.open(modalSuccess);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_INGRESO_PRODUCTO_ACTUALIZAR_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(false);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(modalSuccess);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_INGRESO_PRODUCTO_ACTUALIZAR_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  enviarProductoIngreso(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.productoIngresoRequest = new ProductoIngresoRequest();
    this.productoIngresoRequest.idEstado = PaneraEstado.ID_INGRESO_ALMACEN_ENVIADO_ALMACEN;
    this.actualizarProductoIngreso(modalSuccess);
  }

  almacenarProductoIngreso(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.productoIngresoRequest = new ProductoIngresoRequest();
    this.productoIngresoRequest.idEstado = PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO;
    this.actualizarProductoIngreso(modalSuccess);
  }

  verBotones() {
    if (Number(this.productoIngreso.idEstado) === 0) {
      this.verBtnEnviar = false;
      this.verBtnAlmacenar = false;
    } else if (Number(this.productoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_REGISTRADO) {
      this.verBtnEnviar = true;
      this.verBtnAlmacenar = false;
    } else if (Number(this.productoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ENVIADO_ALMACEN) {
      this.verBtnEnviar = false;
      this.verBtnAlmacenar = true;
    } else if (Number(this.productoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO) {
      this.verBtnEnviar = false;
      this.verBtnAlmacenar = false;
    }
  }


  cancelar() {
    this.router.navigate(['almacen/producto/ingreso']);
  }
}
