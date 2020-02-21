import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoResponse } from '../models/pedido.response';
import { PedidoRequest } from '../models/pedido.request';
import { PedidosPedidoService } from '../pedidos-pedido.service';
import { AdministracionTiendaService } from 'src/app/business/administracion/tienda/administracion-tienda.service';
import { TiendaRequest } from 'src/app/business/administracion/tienda/models/tienda.request';
import { TiendaResponse } from 'src/app/business/administracion/tienda/models/tienda.response';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { LoginResponse } from 'src/app/login/model/panera-login.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PaneraParametro } from 'src/app/commons/util/panera-parametro';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-pedido-bandeja',
    templateUrl: './pedido-bandeja.component.html',
    styleUrls: ['./pedido-bandeja.component.scss'],
    providers: [
      PedidosPedidoService,
      AdministracionTiendaService,
      AdministracionEstadoService,
    ]
  })

export class PedidoBandejaComponent {

  public usuario: LoginResponse;
  public pedidos: PedidoResponse[];
  public tiendas: TiendaResponse[];
  public estados: EstadoResponse[];
  public pedidoRequest: PedidoRequest;
  public idTienda = 0;
  public idEstado = 0;
  public fechaRegistro;
  public fechaProceso;
  public fechaEntrega;
  public numPedido = '';
  public loading: boolean;
  public verBtnNuevo: boolean;
  public verBtnNuevoEsp: boolean;
  public verBtnProductos: boolean;
  public verTiendas: boolean;
  public tipo = 0;

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public valor: boolean;

  constructor(private router: Router,
              @Inject(LOCAL_STORAGE) private storage,
              private pedidoService: PedidosPedidoService,
              private tiendaService: AdministracionTiendaService,
              private estadoService: AdministracionEstadoService) {
    //this.fecha = PaneraUtils.obtenerFechaHoyView();
    this.pedidos = [];
    this.pedidoRequest = new PedidoRequest();
    this.obtenerUsuario();
    this.valor = false;
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  obtenerUsuario() {
    this.usuario = this.storage.get('usuario-panera');
    if (String(this.usuario.idTienda) !== '0') {
      this.verTiendas = false;
      this.idTienda = this.usuario.idTienda;
      this.verBtnNuevo = true;
      this.verBtnNuevoEsp = true;
      this.verBtnProductos = false;
    } else {
      this.verTiendas = true;
      this.verBtnNuevo = false;
      this.verBtnNuevoEsp = false;
      this.verBtnProductos = true;
    }
    this.listarTiendas();
  }

  listarTiendas() {
    PaneraVistaUtils.mostrarLoading(true);
    const tiendaRequest = new TiendaRequest();
    tiendaRequest.nombre = '';
    this.tiendaService.listarTiendas(tiendaRequest).subscribe(
      data => {
        if (data.success) {
          this.tiendas = data.result;
          this.listarEstados();
        } else {
          console.log(data.message);
        }
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  listarEstados() {
    const estadoRequest = new EstadoRequest();
    estadoRequest.idTipo = PaneraTipoEstado.ID_PEDIDO;
    this.estadoService.listarEstados(estadoRequest).subscribe(
      data => {
        if (data.success) {
          this.estados = data.result;
        } else{
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

  buscarPedidos() {
    PaneraVistaUtils.mostrarLoading(true);
    this.pedidoRequest.idTienda = this.idTienda;
    this.pedidoRequest.idEstado = this.idEstado;
    this.pedidoRequest.numPedido = this.numPedido;
    this.pedidoRequest.fechaRegistro = PaneraUtils.obtenerFecha(this.fechaRegistro);
    this.pedidoRequest.fechaProceso = PaneraUtils.obtenerFecha(this.fechaProceso);
    this.pedidoRequest.fechaEntrega = PaneraUtils.obtenerFecha(this.fechaEntrega);
    this.pedidoService.listarPedidos(this.pedidoRequest).subscribe(
      data => {
        if (data.success) {
          this.pedidos = data.result;
          this.valor = true;
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

  verProductosPedidos() {
    location.href = PaneraConstantes.API_PEDIDOS_PRODUCTO + '?fecha=' + PaneraUtils.obtenerFecha(this.fechaRegistro);
  }

  agregarPedidoEspecial() {
      location.href = '#/pedidos/pedido/registro?idPedido=0&idTipoPedido=' + PaneraParametro.ID_TIPO_PEDIDO_ESPECIAL;
  }

  agregarPedido() {
      location.href = '#/pedidos/pedido/registro?idPedido=0&idTipoPedido=' + PaneraParametro.ID_TIPO_PEDIDO_NORMAL;
  }

  editarPedido(idPedido: number) {
    location.href = '#/pedidos/pedido/registro?idPedido=' + idPedido;
  }

}
