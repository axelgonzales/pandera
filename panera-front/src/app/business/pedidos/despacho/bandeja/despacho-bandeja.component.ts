import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosDespachoService } from '../pedidos-despacho.service';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { DespachoResponse } from '../models/despacho.response';
import { DespachoRequest } from '../models/despacho.request';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';
import { TiendaResponse } from 'src/app/business/administracion/tienda/models/tienda.response';
import { LoginResponse } from 'src/app/login/model/panera-login.response';

@Component({
    selector: 'app-despacho-bandeja',
    templateUrl: './despacho-bandeja.component.html',
    styleUrls: ['./despacho-bandeja.component.scss'],
    providers: [
      PedidosDespachoService,
      AdministracionEstadoService,
    ]
  })

export class DespachoBandejaComponent {

  public numDespacho = '';
  public numPedido = '';
  public idEstado = 0;
  public fechaDespacho;

  public usuario: LoginResponse;
  public estados: EstadoResponse[];
  public tiendas: TiendaResponse[];
  public despachos: DespachoResponse[];


  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router,
              private despachoService: PedidosDespachoService,
              private estadoService: AdministracionEstadoService) {
    this.despachos = [];
    this.listarEstados();
    this.fechaDespacho = PaneraUtils.obtenerFechaHoyView();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarEstados() {
    PaneraVistaUtils.mostrarLoading(true);
    const estadoRequest = new EstadoRequest();
    estadoRequest.idTipo = PaneraTipoEstado.ID_DESPACHO;
    this.estadoService.listarEstados(estadoRequest).subscribe(
      data => {
        if (data.success) {
          this.estados = data.result;
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

  buscarDespachos() {
    PaneraVistaUtils.mostrarLoading(true);
    const despachoRequest = new DespachoRequest();
    despachoRequest.numDespacho = this.numDespacho;
    despachoRequest.fechaDespacho = PaneraUtils.obtenerFecha(this.fechaDespacho);
    despachoRequest.idEstado = this.idEstado;
    this.despachoService.listarDespachos(despachoRequest).subscribe(
      data => {
        if (data.success) {
          this.despachos = data.result;
          this.inBusqueda = true;
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

  agregarDespacho() {
    this.router.navigate(['pedidos/despacho/registro']);
  }

  editarDespacho(idDespacho: number) {
    location.href = '#/pedidos/despacho/registro?idDespacho=' + idDespacho;
  }

}
