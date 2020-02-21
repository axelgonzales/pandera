import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PedidosDespachoService } from '../pedidos-despacho.service';
import { ProductoResponse } from 'src/app/business/almacen/producto/producto/models/producto.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { DespachoResponse } from '../models/despacho.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { DespachoDetalleResponse } from '../models/despacho-detalle.response';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import {ProductoStockService} from '../../../almacen/producto/stock/producto-stock.service';
import {ProductoStockRequest} from '../../../almacen/producto/stock/models/producto-stock.request';
import {ProductoStockResponse} from '../../../almacen/producto/stock/models/producto-stock.response';
import { DespachoRequest } from '../models/despacho.request';
import { DespachoDetalleRequest } from '../models/despacho-detalle.request';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';
import { TiendaRequest } from 'src/app/business/administracion/tienda/models/tienda.request';
import { TiendaResponse } from 'src/app/business/administracion/tienda/models/tienda.response';
import { AdministracionTiendaService } from 'src/app/business/administracion/tienda/administracion-tienda.service';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
    selector: 'app-despacho-registro',
    templateUrl: './despacho-registro.component.html',
    styleUrls: ['./despacho-registro.component.scss'],
    providers: [
      PaneraUtils,
      PedidosDespachoService,
      ProductoStockService,
      AdministracionTiendaService,
    ]
  })
export class DespachoRegistroComponent {

  public fechaDespacho;

  public tipoCategorias: TipoCategoriaResponse[];
  public tiendas: TiendaResponse[];
  public categorias: CategoriaResponse[];
  public despacho: DespachoResponse;
  public despachoRequest: DespachoRequest;
  public despachoDetalles: DespachoDetalleResponse[];
  public despachoProductos: DespachoDetalleResponse[];
  public productosStock: ProductoStockResponse[];

  public verEdicion = false;
  public verBtnGuardar = false;
  public verBtnEnviar = false;
  public verBtnDespachar = false;
  public verBtnAgregar = false;
  public verBtnEditar = false;
  public verBtnEliminar = false;
  public editableDetalle = false;

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public currentPageStock = 1;
  public itemsPerPageStock = 10;
  public pageSizeStock: number;
  public loading: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage,
              private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private despachoService: PedidosDespachoService,
              private productoStockService: ProductoStockService,
              private tiendaService: AdministracionTiendaService) {
    this.despachoDetalles = [];
    this.listarTiendas();
    this.cargarDespacho();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePageSize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  public onPageChangeStock(pageNumStock: number): void {
    this.pageSizeStock = this.itemsPerPageStock * (pageNumStock - 1);
  }

  public changePageSizeStock(numStock: number): void {
    this.itemsPerPageStock = this.pageSizeStock + numStock;
  }

  listarTiendas() {
    const tiendaRequest = new TiendaRequest();
    tiendaRequest.nombre = '';
    tiendaRequest.ruc = '';
    this.tiendaService.listarTiendas(tiendaRequest).subscribe(
      data => {
        if (data.success) {
          this.tiendas = data.result;
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

  cargarDespacho() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idDespacho') !== undefined) {
      const idDespacho = Number(this.paneraUtils.obtenerGet('idDespacho'));
      this.despachoService.obtenerDespacho(idDespacho).subscribe(
        data => {
          if (data.success) {
            this.despacho = data.result;
            this.fechaDespacho = PaneraUtils.obtenerFechaView(this.despacho.fechaDespacho);
            this.despachoDetalles = this.despacho.productos.slice();
            this.despachoProductos = this.despacho.productos.slice();
            this.mostrarBotones(this.despacho);
            this.listarProductosStock();
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Despacho');
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
      this.despacho = new DespachoResponse();
      this.fechaDespacho = PaneraUtils.obtenerFechaHoyView();
      this.despacho.id = 0;
      this.despacho.idEstado = 0;
      this.despachoProductos = [];
      this.mostrarBotones(this.despacho);
      this.listarProductosStock();
    }
  }

  listarProductosStock() {
    const productoStockRequest = new ProductoStockRequest();
    productoStockRequest.idAlmacen = 0;
    productoStockRequest.idTipoCategoria = 0;
    productoStockRequest.idCategoria = 0;
    productoStockRequest.numPedido = '';
    this.productoStockService.listarProductosStock(productoStockRequest).subscribe(
      data => {
        if (data.success) {
          this.productosStock = data.result.slice();
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      error => {
        console.log(error);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  agregarProducto(modalProducto: any) {
    this.productosStock.forEach(productoStock => {
      productoStock.activo = '0';
    });
    this.modalService.open(modalProducto);
  }

  seleccionoProducto(i: number) {
    if (this.productosStock[i].activo === '0') {
      this.productosStock[i] .activo = '1';
    } else {
      this.productosStock[i] .activo = '0';
    }
  }

  eliminarProducto(i: number) {
    this.despachoProductos.splice(i, 1);
  }

  agregarProductos() {
    this.productosStock.forEach(producto => {
      if (producto.activo === '1') {
        let noExisteProducto = true;
        this.despachoProductos.forEach(productoPedido => {
          if (productoPedido.idProducto === producto.idProducto) {
            noExisteProducto = false;
          }
        });
        if (noExisteProducto) {
          const auxProductoPedido = new DespachoDetalleResponse();
          auxProductoPedido.id = 0;
          auxProductoPedido.idProducto = producto.idProducto;
          auxProductoPedido.nomProducto = producto.nomProducto;
          auxProductoPedido.idTienda = producto.idTienda;
          auxProductoPedido.nomTienda = producto.nomTienda;
          auxProductoPedido.idPedido = producto.idPedido;
          auxProductoPedido.numPedido = producto.numPedido;
          auxProductoPedido.cantidad = producto.cantidad;
          auxProductoPedido.costoProduccion = producto.costo;
          auxProductoPedido.costoObra = 0;
          auxProductoPedido.costoOtro = 0;
          this.despachoProductos.push(auxProductoPedido);
        }
      }
    });
    this.modalService.dismissAll();
  }

  guardarDespacho(successModal: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.despachoRequest = new DespachoRequest();
    if (this.despacho.id === 0) {
      this.registrarDespacho(successModal);
    } else {
      this.actualizarDespacho(successModal);
    }
  }

  registrarDespacho(successModal: any) {
    this.despachoRequest.observacion = this.despacho.observacion;
    if (this.fechaDespacho !== undefined && this.fechaDespacho !== '') {
      this.despachoRequest.fechaDespacho = PaneraUtils.obtenerFecha(this.fechaDespacho);
    }
    const usuario = this.storage.get('usuario-panera');
    this.despachoRequest.idUsuario = usuario.id;
    this.despachoService.registrarDespacho(this.despachoRequest).subscribe(
      data => {
        if (data.success) {
          this.despacho = data.result;
          this.mostrarBotones(this.despacho);
          this.modalService.open(successModal);
          PaneraVistaUtils.changeValue('Actualizar Despacho');
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_DESPACHO_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_DESPACHO_ERROR + ' ' + data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_DESPACHO_ERROR);
      }
    );
  }

  actualizarDespacho(successModal: any) {
    this.despachoRequest.id = this.despacho.id;
    this.despachoRequest.observacion = this.despacho.observacion;
    if (this.fechaDespacho !== undefined && this.fechaDespacho !== '') {
      this.despachoRequest.fechaDespacho = PaneraUtils.obtenerFecha(this.fechaDespacho);
    }
    this.despachoRequest.productos = this.obtenerProductosDespacho();
    this.despachoService.actualizarDespacho(this.despachoRequest).subscribe(
      data => {
        if (data.success) {
          this.despacho = data.result;
          this.mostrarBotones(this.despacho);
          this.modalService.open(successModal);
          if (Number(this.despacho.idEstado) === PaneraEstado.ID_DESPACHO_REGISTRADO) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_DESPACHO_OK);
          } else if (Number(this.despacho.idEstado) === PaneraEstado.ID_DESPACHO_POR_DESPACHAR) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_SOLICITAR_DESPACHO_OK);
          } else if (Number(this.despacho.idEstado) === PaneraEstado.ID_DESPACHO_DESPACHADO) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_DESPACHAR_DESPACHO_OK);
          }
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_DESPACHO_ERROR + ' ' + data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_DESPACHO_ERROR);
      }
    );
  }

  enviarDespacho(successModal: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.despachoRequest = new DespachoRequest();
    this.despachoRequest.idEstado = PaneraEstado.ID_DESPACHO_POR_DESPACHAR;
    this.actualizarDespacho(successModal);
  }

  despacharDespacho(successModal: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.despachoRequest = new DespachoRequest();
    this.despachoRequest.idEstado = PaneraEstado.ID_DESPACHO_DESPACHADO;
    this.actualizarDespacho(successModal);
  }

  obtenerProductosDespacho(): DespachoDetalleRequest[] {
    const auxProductosDespacho: DespachoDetalleRequest[] = [];
    /* agrego los productos registrados que debo eliminar */
    this.despachoDetalles.forEach(despachoDetalle => {
      let existePedidoDetalle = false;
      this.despachoProductos.forEach(producto => {
        if (producto.idProducto === despachoDetalle.idProducto) {
          existePedidoDetalle = true;
        }
      });
      if (!existePedidoDetalle) {
        const despachoDetalleRequest = new DespachoDetalleRequest();
        despachoDetalleRequest.id = despachoDetalle.id;
        despachoDetalleRequest.activo = '0';
        auxProductosDespacho.push(despachoDetalleRequest);
      }
    });

    this.despachoProductos.forEach(productoPedido => {
      const productoDespachoRequest = new DespachoDetalleRequest();
      productoDespachoRequest.id = productoPedido.id;
      productoDespachoRequest.idProducto = productoPedido.idProducto;
      productoDespachoRequest.idPedido = productoPedido.idPedido;
      productoDespachoRequest.cantidad = productoPedido.cantidad;
      productoDespachoRequest.costoProduccion = productoPedido.costoProduccion;
      productoDespachoRequest.costoObra = productoPedido.costoObra;
      productoDespachoRequest.costoOtro = productoPedido.costoOtro;
      productoDespachoRequest.activo = PaneraConstantes.IN_ACTIVO;
      auxProductosDespacho.push(productoDespachoRequest);
    });
    return auxProductosDespacho;
  }

  mostrarBotones(despacho: DespachoResponse) {
    const idEstado = Number(despacho.idEstado);
    if (idEstado === 0) {
      this.verBtnGuardar = true;
      this.verBtnEnviar = false;
      this.verBtnDespachar = false;
      this.verEdicion = false;
      this.verBtnAgregar = false;
      this.verBtnEditar = true;
      this.verBtnEliminar = true;
      this.editableDetalle = false;
    } else if (idEstado === PaneraEstado.ID_DESPACHO_REGISTRADO) {
      this.verBtnGuardar = true;
      this.verBtnEnviar = true;
      this.verBtnDespachar = false;
      this.verEdicion = true;
      this.verBtnAgregar = true;
      this.verBtnEditar = true;
      this.verBtnEliminar = true;
      this.editableDetalle = true;
      this.editableDetalle = false;
    } else if (idEstado === PaneraEstado.ID_DESPACHO_POR_DESPACHAR) {
      this.verBtnGuardar = false;
      this.verBtnEnviar = false;
      this.verBtnDespachar = true;
      this.verEdicion = true;
      this.verBtnAgregar = false;
      this.verBtnEditar = false;
      this.verBtnEliminar = false;
      this.editableDetalle = false;
    } else {
      this.verBtnGuardar = false;
      this.verBtnEnviar = false;
      this.verBtnDespachar = false;
      this.verEdicion = true;
      this.verBtnAgregar = false;
      this.verBtnEditar = false;
      this.verBtnEliminar = false;
      this.editableDetalle = false;
    }
  }

  cancelar() {
    this.router.navigate(['pedidos/despacho']);
  }

}
