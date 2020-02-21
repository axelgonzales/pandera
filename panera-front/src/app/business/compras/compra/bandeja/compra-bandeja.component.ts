import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompraRequest } from '../models/compra.request';
import { CompraResponse } from '../models/compra.response';
import { ComprasCompraService } from '../compras-compra.service';
import { AdministracionProveedorService } from 'src/app/business/administracion/proveedor/administracion-proveedor.service';
import { ProveedorResponse } from 'src/app/business/administracion/proveedor/models/proveedor.response';
import { ProveedorRequest } from 'src/app/business/administracion/proveedor/models/proveedor.request';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { EstadoResponse } from 'src/app/business/administracion/estado/models/estado.response';
import { AdministracionEstadoService } from 'src/app/business/administracion/estado/administracion-estado.service';
import { EstadoRequest } from 'src/app/business/administracion/estado/models/estado.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { PaneraTipoEstado } from 'src/app/commons/util/panera-tipo-estado';

@Component({
    selector: 'app-compra-bandeja',
    templateUrl: './compra-bandeja.component.html',
    styleUrls: ['./compra-bandeja.component.scss'],
    providers: [
      ComprasCompraService,
      AdministracionProveedorService,
      AdministracionParametroService,
      AdministracionEstadoService,
    ]
  })

export class CompraBandejaComponent {

  public idProveedor = 0;
  public serie = '';
  public idTipoDocumento = 0;
  public documento = '';
  public fecha = PaneraUtils.obtenerFechaHoyView();
  public idEstado = 0;

  public comprasResponse: CompraResponse;
  public compraRequest: CompraRequest;

  public compras: CompraResponse[];

  public tipoDocumentos: ParametroResponse[];
  public proveedores: ProveedorResponse[];
  public estados: EstadoResponse[];
  public loading: boolean;
  public verBotones: boolean;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public inBusqueda: boolean;

  constructor(private router: Router,
              private compraService: ComprasCompraService,
              private proveedorService: AdministracionProveedorService,
              private parametroService: AdministracionParametroService,
              private estadoService: AdministracionEstadoService,
              ) {
    this.compraRequest = new CompraRequest();
    this.listarProveedores();
    this.inBusqueda = false;
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarProveedores() {
    PaneraVistaUtils.mostrarLoading(true);
    const proveedorRequest = new ProveedorRequest();
    proveedorRequest.razonSocial = '';
    proveedorRequest.ruc = '';
    this.proveedorService.listarProveedores(proveedorRequest).subscribe(
      data => {
        if (data.success) {
          this.proveedores = data.result;
          this.listarTipoDocumentos();
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

  listarTipoDocumentos() {
    const parametroRequest = new ParametroRequest();
    parametroRequest.nombre = '';
    parametroRequest.idTipo = PaneraTipoParametro.ID_DOCUMENTOS_DE_COMPRA;
    this.parametroService.listarParametros(parametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoDocumentos = data.result;
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
    estadoRequest.idTipo = PaneraTipoEstado.ID_COMPRA;
    this.estadoService.listarEstados(estadoRequest).subscribe(
      data => {
        if (data.success) {
          this.estados = data.result;
          this.loading = false;
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

  buscarCompras() {
    this.mostrarLoading(true);
    this.compraRequest.idProveedor = this.idProveedor;
    this.compraRequest.serie = this.serie;
    this.compraRequest.idTipoDocumento = this.idTipoDocumento;
    this.compraRequest.documento = this.documento;
    this.compraRequest.idEstado = this.idEstado;
    this.compraRequest.fecha = PaneraUtils.obtenerFecha(this.fecha);
    this.compraService.listarCompras(this.compraRequest).subscribe(
      data => {
        if (data.success) {
          this.compras = data.result;
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

  agregarCompra() {
    this.router.navigate(['compras/compra/registro']);
  }

  editarCompra(idCompra: number) {
    location.href = '#/compras/compra/registro?idCompra=' + idCompra;
  }

  mostrarLoading(estado: boolean) {
    document.getElementById('loaderOverlay').style.display = (estado === true) ? 'block' : 'none';
    this.verBotones = !estado;
  }

}
