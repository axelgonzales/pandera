import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosDevolucionService } from '../pedidos-devolucion.service';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { DevolucionResponse } from '../models/devolucion.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { DevolucionRequest } from '../models/devolucion.request';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-devolucion-bandeja',
    templateUrl: './devolucion-bandeja.component.html',
    styleUrls: ['./devolucion-bandeja.component.scss'],
    providers: [
      PedidosDevolucionService,
      AdministracionEstadoService,
    ]
  })

export class DevolucionBandejaComponent {

  public numDevolucion = '';
  public idEstado = 0;
  public fechaDevolucion;

  public estados: EstadoResponse[];
  public devoluciones: DevolucionResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public valor: boolean;

  constructor(private router: Router,
              private devolucionService: PedidosDevolucionService,
              private estadoService: AdministracionEstadoService) {
    this.listarEstados();
    this.fechaDevolucion = PaneraUtils.obtenerFechaHoyView();
  }

  listarEstados() {
    PaneraVistaUtils.mostrarLoading(true);
    const estadoRequest = new EstadoRequest();
    estadoRequest.idTipo = PaneraTipoEstado.ID_DEVOLUCION;
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

  buscarDevoluciones() {
    PaneraVistaUtils.mostrarLoading(true);
    const devolucionRequest = new DevolucionRequest();
    devolucionRequest.numDevolucion = this.numDevolucion;
    devolucionRequest.fechaDevolucion = PaneraUtils.obtenerFecha(this.fechaDevolucion);
    devolucionRequest.idEstado = this.idEstado;
    this.devolucionService.listarDevoluciones(devolucionRequest).subscribe(
      data => {
        if (data.success) {
          this.devoluciones = data.result;
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

  agregarDevolucion() {
    this.router.navigate(['pedidos/devolucion/registro']);
  }

  editarDevolucion(idDevolucion: number) {
    location.href = '#/pedidos/devolucion/registro?idDevolucion=' + idDevolucion;
  }


}
