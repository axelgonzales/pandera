import { Component, Inject } from '@angular/core';
import { InsumoSalidaService } from '../insumo-salida.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { LoginResponse } from 'src/app/login/model/panera-login.response';
import { InsumoSalidaResponse } from '../models/insumo-salida.response';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { InsumoSalidaRequest } from '../models/insumo-salida.request';
import { InsumoSalidaDetalleResponse } from '../models/insumo-salida-detalle.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-insumo-salida-registro',
    templateUrl: './insumo-salida-registro.component.html',
    styleUrls: ['./insumo-salida-registro.component.scss'],
    providers: [
      PaneraUtils,
      InsumoSalidaService,
      AdministracionParametroService,
    ]
  })
export class InsumoSalidaRegistroComponent {

  public insumoSalida: InsumoSalidaResponse;
  public insumoSalidaRequest: InsumoSalidaRequest;
  public tipoSalidas: ParametroResponse[];
  public insumos: InsumoSalidaDetalleResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  public verBtnSolicitar = false;
  public verBtnAlmacenar = false;

  constructor(private router: Router,
              private modalService: NgbModal,
              private paneraUtils: PaneraUtils,
              private insumoSalidaService: InsumoSalidaService,
              private parametroService: AdministracionParametroService,
              @Inject(LOCAL_STORAGE) private storage) {
    this.listarTipoSalidas();
    
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarTipoSalidas() {
    PaneraVistaUtils.mostrarLoading(true);
    const parametroRequest = new ParametroRequest();
    parametroRequest.idTipo = PaneraTipoParametro.ID_TIPOS_SALIDA_ALMACEN;
    this.parametroService.listarParametros(parametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoSalidas = data.result;
          this.cargarInsumoSalida();
          // this.inBusqueda = true;
          // this.listarEstados();
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }
  cargarInsumoSalida() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idInsumoSalida') !== undefined) {
      const idInsumoSalida = Number(this.paneraUtils.obtenerGet('idInsumoSalida'));
      this.insumoSalidaService.obtenerSalidaInsumo(idInsumoSalida).subscribe(
        data => {
          if (data.success) {
            this.insumoSalida = data.result;
            this.insumos = this.insumoSalida.insumos.slice();
            this.verBotones();
            PaneraVistaUtils.mostrarLoading(false);
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
      this.insumoSalida = new InsumoSalidaResponse();
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  actualizarSalidaInsumo(modalSuccess: any) {
    this.insumoSalidaRequest.id = this.insumoSalida.id;
    this.insumoSalidaService.actualizarSalidaInsumo(this.insumoSalidaRequest).subscribe(
      data => {
        if (data.success) {
          this.insumoSalida = data.result;
          this.modalService.open(modalSuccess);
          this.verBotones();
          if (Number(this.insumoSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_POR_DESPACHAR) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_SOLICITAR_OK);
          }
          if (Number(this.insumoSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_DESPACHADO) {
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_DESPACHADO_OK);
          }
        } else {
          console.log(data.message);
          this.modalService.open(modalSuccess);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_ACTUALIZAR_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(false);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(modalSuccess);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_SALIDA_INTERMEDIO_ACTUALIZAR_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  solicitarSalidaInsumo(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.insumoSalidaRequest = new InsumoSalidaRequest();
    this.insumoSalidaRequest.idEstado = PaneraEstado.ID_SALIDA_ALMACEN_POR_DESPACHAR;
    this.actualizarSalidaInsumo(modalSuccess);
  }

  almacenarSalidaInsumo(modalSuccess: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.insumoSalidaRequest = new InsumoSalidaRequest();
    this.insumoSalidaRequest.idEstado = PaneraEstado.ID_SALIDA_ALMACEN_DESPACHADO;
    this.actualizarSalidaInsumo(modalSuccess);
  }

  verBotones() {
    if (Number(this.insumoSalida.idEstado) === 0) {
      this.verBtnSolicitar = false;
      this.verBtnAlmacenar = false;
    } else if (Number(this.insumoSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_REGISTRADO) {
      this.verBtnSolicitar = true;
      this.verBtnAlmacenar = false;
    } else if (Number(this.insumoSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_POR_DESPACHAR) {
      this.verBtnSolicitar = false;
      this.verBtnAlmacenar = true;
    } else if (Number(this.insumoSalida.idEstado) === PaneraEstado.ID_SALIDA_ALMACEN_DESPACHADO) {
      this.verBtnSolicitar = false;
      this.verBtnAlmacenar = false;
    }
  }

  cancelar() {
    this.router.navigate(['almacen/insumo/salida']);
  }

}
