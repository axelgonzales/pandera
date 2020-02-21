import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PedidoResponse } from '../models/pedido.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PedidoRequest } from '../models/pedido.request';
import { PedidosPedidoService } from '../pedidos-pedido.service';
import { TiendaResponse } from 'src/app/business/administracion/tienda/models/tienda.response';
import { TiendaRequest } from 'src/app/business/administracion/tienda/models/tienda.request';
import { AdministracionTiendaService } from 'src/app/business/administracion/tienda/administracion-tienda.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { LoginResponse } from 'src/app/login/model/panera-login.response';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { ProductoService } from 'src/app/business/almacen/producto/producto/producto.service';
import { ProductoRequest } from 'src/app/business/almacen/producto/producto/models/product.request';
import { ProductoResponse } from 'src/app/business/almacen/producto/producto/models/producto.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraParametro } from 'src/app/commons/util/panera-parametro';
import { PedidoDetalleResponse } from '../models/pedido-detalle.response';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { PedidoDetalleRequest } from '../models/pedido-detalle.request';
import { PedidoMedidaResponse } from '../models/pedido-medida.response';

@Component({
  selector: 'app-pedido-registro',
  templateUrl: './pedido-registro.component.html',
  styleUrls: ['./pedido-registro.component.scss'],
  providers: [
    PedidosPedidoService,
    ProductoService,
    AdministracionTiendaService,
    AdministracionTipoCategoriaService,
    AdministracionCategoriaService,
    PaneraUtils
  ]
})
export class PedidoRegistroComponent {
  closeResult: string;

  public pedido: PedidoResponse;
  public pedidoRequest: PedidoRequest;
  public tiendas: TiendaResponse[];
  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];
  public medidas: PedidoMedidaResponse[];
  public pedidoDetalles: PedidoDetalleResponse[];
  public productosPedido: PedidoDetalleResponse[];

  public productos: ProductoResponse[];

  public esPedidoEspecial = false;
  public esEdicion = false;
  public editarDetalle = false;

  public verBtnGuardar = false;
  public verBtnSolicitar = false;
  public verBtnProcesar = false;
  public verBtnEditar = false;
  public verBtnEliminar = false;
  public verBtnAgregar = false;

  public idTipoCategoria = 0;
  public idCategoria = 0;
  public cantidad = 0;
  public porcion = 0;
  public descripcion = '';
  public position = -1;

  public usuario: LoginResponse;
  public verCampos = false;
  public verCamposEsp = false;
  public vertipopedido = false;
  public verTiendas: boolean;
  public result = '';
  public tipo = 0;
  public arrProductos = [];
  public fechaProceso;
  public fechaEntrega;

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  public inBusquedaProducto = false;
  public currentPageProducto = 1;
  public itemsPerPageProducto = 10;
  public pageSizeProducto: number;

  constructor(private route: ActivatedRoute, private router: Router, private pedidoService: PedidosPedidoService,
              private tiendaService: AdministracionTiendaService, private tipoCategoriaService: AdministracionTipoCategoriaService,
              private categoriaService: AdministracionCategoriaService, private productoService: ProductoService,
              private paneraUtils: PaneraUtils, private modalService: NgbModal, @Inject(LOCAL_STORAGE) private storage) {
    this.usuario = this.storage.get('usuario-panera');
    this.pedido = new PedidoResponse();
    this.productosPedido = [];
    this.listarTipoCategorias();
    this.listarPedidoMedidas();
    this.cargarPedido();
    this.inBusqueda = false;
    this.pedidoRequest = new PedidoRequest();
    this.fechaProceso = PaneraUtils.obtenerFechaHoyView();
    this.fechaEntrega = PaneraUtils.obtenerFechaHoyView();
  }

  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  onPageChangeProducto(pageNumProducto: number): void {
    this.pageSizeProducto = this.itemsPerPageProducto * (pageNumProducto - 1);
  }

  changePagesizeProducto(numProducto: number): void {
    this.itemsPerPageProducto = this.pageSizeProducto + numProducto;
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

  listarTipoCategorias() {
    const tipoCategoriaRequest = new TipoCategoriaRequest();
    tipoCategoriaRequest.tipo = 'P';
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

  listarCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const categoriaRequest = new CategoriaRequest();
    categoriaRequest.nombre = '';
    categoriaRequest.idTipo = this.idTipoCategoria;
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

  listarProductos() {
    this.productos = [];
    PaneraVistaUtils.mostrarLoading(true);
    const productoRequest = new ProductoRequest();
    productoRequest.idCategoria = this.idCategoria;
    productoRequest.nombre = '';
    this.productoService.listarProductos(productoRequest).subscribe(
      data => {
        if (data.success) {
          data.result.forEach(producto => {
            producto.activo = '0';
            this.productos.push(producto);
          });
          this.inBusqueda = true;
          console.log(data.result);
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

  listarPedidoMedidas() {
    this.pedidoService.listarPedidoMedidas().subscribe(
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

  cargarPedido() {
    const idPedido = Number(this.paneraUtils.obtenerGet('idPedido'));
    PaneraVistaUtils.mostrarLoading(true);
    if (idPedido > 0) {
      this.pedidoService.obtenerPedido(idPedido).subscribe(
        data => {
          if (data.success) {
            this.pedido = data.result;
            this.pedidoDetalles = this.pedido.productos.slice();
            this.productosPedido = this.pedido.productos.slice();
            if (this.pedido.fechaProceso !== null) {
              this.fechaProceso = PaneraUtils.obtenerFechaView(this.pedido.fechaProceso);
            }
            if (this.pedido.fechaEntrega !== null) {
              this.fechaEntrega = PaneraUtils.obtenerFechaView(this.pedido.fechaEntrega);
            }

            this.verBotones(this.pedido);
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Pedido');
            this.listarTipoCategorias();
          } else {
            console.log(data.message);
          }
        },
        err => {
          console.log(err);
          PaneraVistaUtils.mostrarLoading(false);
        }
      );
    } else {
      this.pedido = new PedidoResponse();
      this.pedido.id = 0;
      this.pedido.idEstado = 0;
      this.pedido.idTipo = Number(this.paneraUtils.obtenerGet('idTipoPedido'));
      this.pedido.idTienda = this.usuario.idTienda;
      this.pedido.nomTienda = this.usuario.nomTienda;
      this.pedidoDetalles = [];
      this.productosPedido = [];
      this.verBotones(this.pedido);
      this.listarTiendas();

      // this.productosPedido = [];
      // this.listarTiendas();
      // this.verBotones(this.pedido);
    }
  }

  guardarPedido(successModal: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.pedidoRequest = new PedidoRequest();
    if (this.pedido.id === 0) {
      this.registrarPedido(successModal);
    } else {
      this.actualizarPedido(successModal);
    }
  }

  registrarPedido(successModal: any) {
    this.pedidoRequest.idTipo = this.pedido.idTipo;
    this.pedidoRequest.idUsuario = this.usuario.id;
    this.pedidoRequest.idTienda = this.usuario.idTienda;
    this.pedidoRequest.cliente = this.pedido.cliente;
    this.pedidoRequest.telefono = this.pedido.telefono;
    this.pedidoRequest.celular = this.pedido.celular;
    this.pedidoRequest.email = this.pedido.email;
    this.pedidoRequest.fechaProceso = PaneraUtils.obtenerFecha(this.fechaProceso);
    // this.pedidoRequest.horaProceso = this.pedido.hora_proceso;
    this.pedidoRequest.fechaEntrega = PaneraUtils.obtenerFecha(this.fechaEntrega);
    // this.pedidoRequest.hora_proceso = this.pedido.hora_proceso;
    this.pedidoRequest.productos = this.obtenerProductosPedido();
    this.pedidoService.registrarPedido(this.pedidoRequest).subscribe(
      data => {
        if (data.success) {
          this.pedido = data.result;
          // const auxProductosPedido: ProductoPedidoResponse[] = [];
          // console.log(this.pedido.productos.slice());
          // this.productosPedido = this.pedido.productos.slice();
          this.verCampos = true;
          this.verBotones(this.pedido);
          this.modalService.open(successModal);
          PaneraVistaUtils.changeValue('Actualizar Pedido');
          PaneraVistaUtils.showSuccess('Se registró correctamente el pedido.');
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError('No se pudo registrar el pedido.');
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError('Ocurrió un error al registrar el pedido.');
      }
    );
  }

  actualizarPedido(successModal: any) {
    this.pedidoRequest.id = this.pedido.id;
    this.pedidoRequest.cliente = this.pedido.cliente;
    this.pedidoRequest.telefono = this.pedido.telefono;
    this.pedidoRequest.celular = this.pedido.celular;
    this.pedidoRequest.email = this.pedido.email;
    if (this.fechaEntrega !== undefined && this.fechaEntrega !== '') {
      this.pedidoRequest.fechaEntrega = PaneraUtils.obtenerFecha(this.fechaEntrega);
    }
    // this.pedidoRequest.hora_proceso = this.pedido.hora_proceso;
    if (this.fechaProceso !== undefined && this.fechaProceso !== '') {
      this.pedidoRequest.fechaProceso = PaneraUtils.obtenerFecha(this.fechaProceso);
    }
    // this.pedidoRequest.hora_proceso = this.pedido.hora_proceso;
    this.pedidoRequest.productos = this.obtenerProductosPedido();
    this.pedidoService.actualizarPedido(this.pedidoRequest).subscribe(
      data => {
        if (data.success) {
          this.pedido = data.result;
          this.verBotones(this.pedido);
          this.modalService.open(successModal);
          if (Number(this.pedido.idEstado) === PaneraEstado.ID_PEDIDO_REGISTRADO) {
            PaneraVistaUtils.showSuccess('Se actualizó correctamente el pedido.');
          } else if (Number(this.pedido.idEstado) === PaneraEstado.ID_PEDIDO_SOLICITADO) {
            PaneraVistaUtils.showSuccess('Se solicitó correctamente el pedido.');
          } else if (Number(this.pedido.idEstado) === PaneraEstado.ID_PEDIDO_EN_PROCESO) {
            PaneraVistaUtils.showSuccess('Se envio a procesar correctamente el pedido.');
          }
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError('No se pudo actualizar el pedido.');
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError('Ocurrio un error al intentar actualizar el pedido.');
      }
    );
  }

  solicitarPedido(successModal: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.pedidoRequest.idEstado = PaneraEstado.ID_PEDIDO_SOLICITADO;
    this.actualizarPedido(successModal);
  }

  procesarPedido(successModal: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.pedidoRequest.idEstado = PaneraEstado.ID_PEDIDO_EN_PROCESO;
    this.actualizarPedido(successModal);
  }

  obtenerProductosPedido(): PedidoDetalleRequest[] {
    const auxProductosPedido: PedidoDetalleRequest[] = [];
    /* agrego los productos registrados que debo eliminar */
    this.pedidoDetalles.forEach(pedidoDetalle => {
      let existePedidoDetalle = false;
      this.productosPedido.forEach(producto => {
        if (producto.idProducto === pedidoDetalle.idProducto) {
          existePedidoDetalle = true;
        }
      });
      if (!existePedidoDetalle) {
        pedidoDetalle.activo = '0';
        auxProductosPedido.push(pedidoDetalle);
      }
    });

    this.productosPedido.forEach(productoPedido => {
      const productoPedidoRequest = new PedidoDetalleRequest();
      productoPedidoRequest.id = productoPedido.id;
      productoPedidoRequest.idProducto = productoPedido.idProducto;
      productoPedidoRequest.cantidad = productoPedido.cantidad;
      productoPedidoRequest.idMedida = productoPedido.idMedida;
      productoPedidoRequest.descripcion = productoPedido.descripcion;
      productoPedidoRequest.activo = PaneraConstantes.IN_ACTIVO;
      auxProductosPedido.push(productoPedidoRequest);
    });
    return auxProductosPedido;
  }

  agregarProducto(productoModal: any) {
    this.productos = [];
    this.idTipoCategoria = 0;
    this.idCategoria = 0;
    this.categorias = [];
    this.modalService.open(productoModal);
  }

  seleccionarProducto(id: number) {
    const i = this.productos.findIndex(producto => producto.id === id);
    if (this.productos[i].activo === '0') {
      this.productos[i] .activo = '1';
    } else {
      this.productos[i] .activo = '0';
    }
  }

  agregarProductos() {
    this.productos.forEach(producto => {
      if (producto.activo === '1') {
        let noExisteProducto = true;
        this.productosPedido.forEach(productoPedido => {
          if (productoPedido.idProducto === producto.id) {
            noExisteProducto = false;
          }
        });
        if (noExisteProducto) {
          const productoPedido = new PedidoDetalleResponse();
          productoPedido.id = 0;
          productoPedido.idProducto = producto.id;
          productoPedido.nomProducto = producto.nombre;
          productoPedido.idCategoria = producto.idCategoria;
          productoPedido.nomCategoria = producto.nomCategoria;
          productoPedido.cantidad = 0;
          productoPedido.idMedida = 0;
          this.productosPedido.push(productoPedido);
        }
      }
    });
    this.modalService.dismissAll();
  }

  eliminarProducto(i: number) {
    this.productosPedido.splice(i, 1);
  }

  editarProducto(i: number, observacionModal: any) {
    this.descripcion = this.productosPedido[i].descripcion;
    this.position = i;
    this.modalService.open(observacionModal);
  }

  guardarDescripcion() {
    this.productosPedido[this.position].descripcion = this.descripcion;
    this.modalService.dismissAll();
  }

  verBotones(pedido: PedidoResponse) {
    if (Number(pedido.idTienda) > 0) {
      this.verTiendas = false;
    } else {
      this.verTiendas = true;
    }

    if (Number(pedido.idTipo) === PaneraParametro.ID_TIPO_PEDIDO_ESPECIAL) {
      this.esPedidoEspecial = true;
    } else {
      this.esPedidoEspecial = false;
    }

    if (Number(pedido.id) > 0) {
      this.esEdicion = true;
    } else {
      this.esEdicion = false;
    }

    if (Number(pedido.idEstado) === 0) {
      this.verBtnGuardar = true;
      this.verBtnSolicitar = false;
      this.verBtnProcesar = false;
      this.verBtnAgregar = true;
      this.verBtnEditar = true;
      this.verBtnEliminar = true;
      this.editarDetalle = true;
    } else if (Number(pedido.idEstado) === PaneraEstado.ID_PEDIDO_REGISTRADO) {
      this.verBtnGuardar = true;
      this.verBtnSolicitar = true;
      this.verBtnProcesar = false;
      this.verBtnAgregar = true;
      this.verBtnEditar = true;
      this.verBtnEliminar = true;
      this.editarDetalle = true;
    } else if (Number(pedido.idEstado) === PaneraEstado.ID_PEDIDO_SOLICITADO) {
      if (Number(this.usuario.idTienda) > 0) {
        this.verBtnProcesar = false;
      } else {
        this.verBtnProcesar = true;
      }
      this.verBtnGuardar = false;
      this.verBtnSolicitar = false;
      this.verBtnAgregar = false;
      this.verBtnEditar = false;
      this.verBtnEliminar = false;
      this.verTiendas = false;
      this.editarDetalle = false;
    } else {
      this.verBtnGuardar = false;
      this.verBtnSolicitar = false;
      this.verBtnProcesar = false;
      this.verBtnAgregar = false;
      this.verBtnEditar = false;
      this.verBtnEliminar = false;
      this.verTiendas = false;
      this.editarDetalle = false;
    }
  }

  cancelar(modalConfirmacion: any) {
    if (this.verBtnGuardar === true && this.verBtnSolicitar === false) {
      this.result = 'Esta seguro de salir aun no a Guardado su pedido';
      this.modalService.open(modalConfirmacion);
    }
    if (this.verBtnSolicitar === true) {
      this.result = 'Esta seguro de salir aun no a Solicitado su pedido';
      this.modalService.open(modalConfirmacion);
    }
    if (this.verBtnProcesar === true) {
      this.salir(modalConfirmacion);
    }
    if (this.pedido.idEstado !== PaneraEstado.ID_PEDIDO_REGISTRADO) {
      this.salir(modalConfirmacion);
    }
  }

  salir(modalConfirmacion: any) {
    this.modalService.dismissAll(modalConfirmacion);
    this.router.navigate(['pedidos/pedido']);
  }

}
