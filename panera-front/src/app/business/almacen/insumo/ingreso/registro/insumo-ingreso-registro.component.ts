import { InsumoIngresoService } from '../insumo-ingreso.service';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { LoginResponse } from 'src/app/login/model/panera-login.response';
import { InsumoIngresoResponse } from '../models/insumo-ingreso.response';
import { InsumoIngresoRequest } from '../models/insumo-ingreso.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { InsumoIngresoDetalleResponse } from '../models/insumo-ingreso-detalle.response';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { InsumoRequest } from '../../insumo/models/insumo.request';
import { InsumoService } from '../../insumo/insumo.service';
import { InsumoResponse } from '../../insumo/models/insumo.response';
import { ProveedorRequest } from 'src/app/business/administracion/proveedor/models/proveedor.request';
import { MarcaRequest } from 'src/app/business/administracion/marca/models/marca.request';
import { AdministracionMarcaService } from 'src/app/business/administracion/marca/administracion-marca.service';
import { AdministracionProveedorService } from 'src/app/business/administracion/proveedor/administracion-proveedor.service';
import { ProveedorResponse } from 'src/app/business/administracion/proveedor/models/proveedor.response';
import { MarcaResponse } from 'src/app/business/administracion/marca/models/marca.response';
import { InsumoIngresoDetalleRequest } from '../models/insumo-ingreso-detalle.request';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';

@Component({
    selector: 'app-insumo-ingreso-registro',
    templateUrl: './insumo-ingreso-registro.component.html',
    styleUrls: ['./insumo-ingreso-registro.component.scss'],
    providers: [
      InsumoService,
      InsumoIngresoService,
      AdministracionMarcaService,
      AdministracionProveedorService,
      AdministracionCategoriaService,
      AdministracionParametroService,
      AdministracionTipoCategoriaService,
      PaneraUtils,
    ]
  })
export class InsumoIngresoRegistroComponent {

  public closeResult: string;

  public usuario: LoginResponse;

  public marcas: MarcaResponse[];
  public insumos: InsumoResponse[];
  public proveedores: ProveedorResponse[];
  public categorias: CategoriaResponse[];
  public tipoCategorias: TipoCategoriaResponse[];

  public insumoIngresoRequest: InsumoIngresoRequest;
  public insumoIngreso: InsumoIngresoResponse;
  public tipoIngresos: ParametroResponse[];
  public ingresoInsumos: InsumoIngresoDetalleResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  public idInsumoIngreso = 0;
  public idTipoCategoria = 0;
  public idCategoria = 0;
  public idInsumo = 0;
  public idProveedor = 0;
  public idMarca = 0;
  public precio = 0;
  public cantidad = 0;
  public cantidadReal = 0;
  public position = -1;

  public verBtnGuardar = false;
  public verBtnAgregar = false;
  public verBtnAlmacenar = false;

  public verTipoIngreso = false;
  public verCompra = false;
  public verEstado = false;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              @Inject(LOCAL_STORAGE) private storage,
              private insumoIngresoService: InsumoIngresoService,
              private marcaService: AdministracionMarcaService,
              private proveedorService: AdministracionProveedorService,
              private insumoService: InsumoService,
              private categoriaService: AdministracionCategoriaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService,
              private parametroService: AdministracionParametroService) {
    this.listarTipoCategorias();
    this.listarMarcas();
    this.listarProveedores();
    this.cargarInsumoIngreso();
    this.insumoIngresoRequest = new InsumoIngresoRequest();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  obtenerUsuario() {
    this.usuario = this.storage.get('usuario-panera');
  }

  listarTipoIngresos() {
    PaneraVistaUtils.mostrarLoading(true);
    const parametroRequest = new ParametroRequest();
    parametroRequest.idTipo = PaneraTipoParametro.ID_TIPOS_INGRESO_ALMACEN;
    this.parametroService.listarParametros(parametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoIngresos = data.result;
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
    tipoCategoriaRequest.tipo = 'I';
    this.tipoCategoriaService.listarTipoCategorias(tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategorias = data.result;
        } else {
          console.log(data.message);
        }
      },
      err => {
        console.log(err);
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

  listarInsumos() {
    PaneraVistaUtils.mostrarLoading(true);
    const insumoRequest = new InsumoRequest();
    insumoRequest.idCategoria = this.idCategoria;
    this.insumoService.listarInsumos(insumoRequest).subscribe(
      data => {
        if (data.success) {
          this.insumos = data.result;
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

  listarMarcas() {
    const marcaRequest = new MarcaRequest();
    this.marcaService.listarMarcas(marcaRequest).subscribe(
      data => {
        if (data.success) {
          this.marcas = data.result;
          PaneraVistaUtils.mostrarLoading(false);
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

  listarProveedores() {
    PaneraVistaUtils.mostrarLoading(true);
    const proveedorRequest = new ProveedorRequest();
    proveedorRequest.razonSocial = '';
    proveedorRequest.ruc = '';
    console.log('proveedores');
    this.proveedorService.listarProveedores(proveedorRequest).subscribe(
      data => {
        if (data.success) {
          console.log('proveedores',data.result);
          this.proveedores = data.result;
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

  cargarInsumoIngreso() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idInsumoIngreso') !== undefined) {
      const idInsumoIngreso = Number(this.paneraUtils.obtenerGet('idInsumoIngreso'));
      this.insumoIngresoService.obtenerIngresoInsumo(idInsumoIngreso).subscribe(
        data => {
          if (data.success) {
            this.insumoIngreso = data.result;
            this.ingresoInsumos = this.insumoIngreso.insumos.slice();
            this.listarTipoIngresos();
            this.verBotones(this.insumoIngreso);
            PaneraVistaUtils.changeValue('Actualizar Insumo Ingreso');
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
      this.insumoIngreso = new InsumoIngresoResponse();
      this.insumoIngreso.insumos = [];
      this.ingresoInsumos = [];
      this.listarTipoIngresos();
      this.verBotones(this.insumoIngreso);
    }
  }

  guardarInsumoIngreso(content1: any) {
    PaneraVistaUtils.mostrarLoading(true);
    if (String(this.insumoIngreso.id) === '0') {
      this.registrarInsumoIngreso(content1);
    } else {
      this.actualizarInsumoIngreso(content1);
    }
  }

  registrarInsumoIngreso(content1: any) {
    this.insumoIngresoRequest.idTipo = this.insumoIngreso.idTipo;
    this.insumoIngresoRequest.observacion = this.insumoIngreso.observacion;
    this.insumoIngresoRequest.insumos = this.obtenerInsumos();
    this.insumoIngresoService.registarIngresoInsumo(this.insumoIngresoRequest).subscribe(
      data => {
        if (data.success) {
          this.insumoIngreso = data.result;
          this.ingresoInsumos = this.insumoIngreso.insumos.slice();
          this.modalService.open(content1);
          PaneraVistaUtils.showSuccess('Se registro correctamente el ingreso de insumos.');
          this.verBotones(this.insumoIngreso);
          PaneraVistaUtils.changeValue('Actualizar Insumo Ingreso');
        } else {
          console.log(data.message);
          this.modalService.open(content1);
          PaneraVistaUtils.showSuccess('No se pudo registrar el ingreso de insumos.');
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(false);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(content1);
        PaneraVistaUtils.showSuccess('Ocurrio un error al intentar registrar el ingreso de insumo.');
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  actualizarInsumoIngreso(content1: any) {
    this.insumoIngresoRequest.id = this.insumoIngreso.id;
    this.insumoIngresoRequest.idTipo = this.insumoIngreso.idTipo;
    this.insumoIngresoRequest.observacion = this.insumoIngreso.observacion;
    this.insumoIngresoRequest.insumos = this.obtenerInsumos();
    this.insumoIngresoService.actualizarInsumo(this.insumoIngresoRequest).subscribe(
      data => {
        if (data.success) {
          this.insumoIngreso = data.result;
          this.modalService.open(content1);
          this.verBotones(this.insumoIngreso);
          PaneraVistaUtils.showSuccess('Se actualizó correctamente el ingreso de insumos.');
        } else {
          console.log(data.message);
          this.modalService.open(content1);
          PaneraVistaUtils.showSuccess('No se pudo actualizar el ingreso de insumos.');
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(false);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(content1);
        PaneraVistaUtils.showSuccess('Ocurrio un error al intentar actualizar el ingreso de insumo.');
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  almacenarInsumoIngreso(content1: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.insumoIngresoRequest.idEstado = PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO;
    this.actualizarInsumoIngreso(content1);
  }

  obtenerInsumos(): InsumoIngresoDetalleRequest[] {
    const insumosIngresoDetalleRequest: InsumoIngresoDetalleRequest[] = [];
    this.ingresoInsumos.forEach(ingresoInsumo => {
        const insumoIngresoDetalleRequest = new InsumoIngresoDetalleRequest();
        insumoIngresoDetalleRequest.id = ingresoInsumo.id;
        insumoIngresoDetalleRequest.idInsumo = ingresoInsumo.idInsumo;
        insumoIngresoDetalleRequest.idProveedor = ingresoInsumo.idProveedor;
        insumoIngresoDetalleRequest.idMarca = ingresoInsumo.idMarca;
        insumoIngresoDetalleRequest.cantidad = ingresoInsumo.cantidad;
        insumoIngresoDetalleRequest.cantidadReal = ingresoInsumo.cantidadReal;
        insumoIngresoDetalleRequest.precio = ingresoInsumo.precio;
        insumoIngresoDetalleRequest.activo = PaneraConstantes.IN_ACTIVO;
        insumosIngresoDetalleRequest.push(insumoIngresoDetalleRequest);
    });
    this.insumoIngreso.insumos.forEach(ingresoInsumo => {
      const index = this.ingresoInsumos.findIndex(item => Number(item.id) === Number(ingresoInsumo.id));
      if (index < 0) {
        const insumoIngresoDetalleRequest = new InsumoIngresoDetalleRequest();
        insumoIngresoDetalleRequest.id = ingresoInsumo.id;
        insumoIngresoDetalleRequest.idInsumo = ingresoInsumo.idInsumo;
        insumoIngresoDetalleRequest.idProveedor = ingresoInsumo.idProveedor;
        insumoIngresoDetalleRequest.idMarca = ingresoInsumo.idMarca;
        insumoIngresoDetalleRequest.cantidad = ingresoInsumo.cantidad;
        insumoIngresoDetalleRequest.cantidadReal = ingresoInsumo.cantidadReal;
        insumoIngresoDetalleRequest.precio = ingresoInsumo.precio;
        insumoIngresoDetalleRequest.activo = PaneraConstantes.IN_INACTIVO;
        insumosIngresoDetalleRequest.push(insumoIngresoDetalleRequest);
      }
    });
    return insumosIngresoDetalleRequest;
  }

  agregarInsumo(contentModal: any) {
    this.modalService.open(contentModal);
    this.idInsumoIngreso = 0;
    this.idTipoCategoria = 0;
    this.idCategoria = 0;
    this.idInsumo = 0;
    this.idProveedor = 0;
    this.idMarca = 0;
    this.precio = 0;
    this.cantidad = 0;
    this.cantidadReal = 0;
    this.position = -1;
  }

  editarInsumo(i: number, contentModal: any) {
    this.modalService.open(contentModal);
    const ingresoInsumo = this.ingresoInsumos[i];
    this.idInsumoIngreso = ingresoInsumo.id;
    this.idTipoCategoria = ingresoInsumo.idTipoCategoria;
    this.idCategoria = ingresoInsumo.idCategoria;
    this.idInsumo = ingresoInsumo.idInsumo;
    this.idProveedor = ingresoInsumo.idProveedor;
    this.idMarca = ingresoInsumo.idMarca;
    this.precio = ingresoInsumo.precio;
    this.cantidad = ingresoInsumo.cantidad;
    this.cantidadReal = ingresoInsumo.cantidadReal;
    this.position = i;
    this.listarCategorias();
    this.listarInsumos();
  }

  eliminarInsumo(i: number) {
    this.ingresoInsumos.splice(i, 1);
  }

  guardarInsumo() {
    if (this.validarInsumo()) {
      const insumoIngresoDetalle = new InsumoIngresoDetalleResponse();
      insumoIngresoDetalle.id = this.idInsumoIngreso;
      insumoIngresoDetalle.idTipoCategoria = this.idTipoCategoria;
      insumoIngresoDetalle.nomTipoCategoria = this.obtenerNomTipoCategoria(this.idTipoCategoria);
      insumoIngresoDetalle.idCategoria = this.idCategoria;
      insumoIngresoDetalle.nomCategoria = this.obtenerNomCategoria(this.idCategoria);
      insumoIngresoDetalle.idInsumo = this.idInsumo;
      insumoIngresoDetalle.nomInsumo = this.obtenerNomInsumo(this.idInsumo);
      insumoIngresoDetalle.idProveedor = this.idProveedor;
      insumoIngresoDetalle.idMarca = this.idMarca;
      insumoIngresoDetalle.precio = this.precio;
      insumoIngresoDetalle.cantidad = this.cantidad;
      insumoIngresoDetalle.cantidadReal = this.cantidadReal;
      if (this.position >= 0) {
        this.ingresoInsumos[this.position] = insumoIngresoDetalle;
      } else {
        this.ingresoInsumos.push(insumoIngresoDetalle);
      }
      this.modalService.dismissAll();
    }
  }

  validarInsumo(): boolean {
    let esValido = true;
    if (this.idTipoCategoria === 0) {
      PaneraVistaUtils.invalid('cmbTipoCategoria');
      esValido = false;
    }
    if (this.idCategoria === 0) {
      PaneraVistaUtils.invalid('cmbCategoria');
      esValido = false;
    }
    if (this.idInsumo === 0) {
      PaneraVistaUtils.invalid('cmbInsumo');
      esValido = false;
    }
    if (this.idProveedor === 0) {
      PaneraVistaUtils.invalid('cmbProveedor');
      esValido = false;
    }
    if (this.idMarca === 0) {
      PaneraVistaUtils.invalid('cmbMarca');
      esValido = false;
    }
    if (this.cantidad === 0 || String(this.cantidad) === '') {
      PaneraVistaUtils.invalid('txtCantidad');
      esValido = false;
    }
    if (this.precio === 0 || String(this.precio) === '') {
      PaneraVistaUtils.invalid('txtPrecio');
      esValido = false;
    }
    return esValido;
  }

  validarCampo(campo: any) {
    if (campo.value === '0' || campo.value === '') {
      // PaneraVistaUtils.invalid(campo.name);
      console.log('Campo Validado');
    } else {
      PaneraVistaUtils.valid(campo.name);
    }
  }

  obtenerNomCategoria(id: number): string {
    let nomCategoria = '';
    this.categorias.forEach(item => {
      if (Number(item.id) === Number(id)) {
        nomCategoria = item.nombre;
      }
    });
    return nomCategoria;
  }

  obtenerNomTipoCategoria(id: number): string {
    let nomTipoCategoria = '';
    this.tipoCategorias.forEach(item => {
      if (Number(item.id) === Number(id)) {
        nomTipoCategoria = item.nombre;
      }
    });
    return nomTipoCategoria;
  }

  obtenerNomInsumo(id: number): string {
    let nomInsumo = '';
    this.insumos.forEach(item => {
      if (Number(item.id) === Number(id)) {
        nomInsumo = item.nombre;
      }
    });
    return nomInsumo;
  }

  verBotones(insumoIngreso: InsumoIngresoResponse) {
    if (Number(insumoIngreso.idEstado) === 0) {
      this.verBtnAgregar = true;
      this.verBtnGuardar = true;
      this.verBtnAlmacenar = false;
      this.verTipoIngreso = false;
      this.verEstado = false;
      this.verCompra = false;
    } else if (Number(insumoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_REGISTRADO) {
      this.verBtnAgregar = true;
      this.verBtnGuardar = true;
      this.verBtnAlmacenar = true;
      this.verEstado = true;
      this.verTipoIngreso = true;
    } else if (Number(insumoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ENVIADO_ALMACEN) {
      this.verBtnAgregar = false;
      this.verBtnGuardar = false;
      this.verBtnAlmacenar = true;
      this.verTipoIngreso = true;
      this.verEstado = true;
    } else if (Number(insumoIngreso.idEstado) === PaneraEstado.ID_INGRESO_ALMACEN_ALMACENADO) {
      this.verBtnAgregar = false;
      this.verBtnGuardar = false;
      this.verBtnAlmacenar = false;
      this.verEstado = true;
      this.verTipoIngreso = true;
    }
    if (String(insumoIngreso.idCompra) !== '0') {
      this.verCompra = true;
    }
  }


  cancelar() {
    this.router.navigate(['almacen/insumo/ingreso']);
  }


  keyPressDecimal(event: KeyboardEvent,value) {
    const regex = {
        string: new RegExp(/^[a-zA-Z]/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[1-9][0-9]*([.][0-9]{2}|)$/)
    };

    const specialKeys = {
        string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };

    if (specialKeys['decimal'].indexOf(event.key) !== -1) {
        return;
    }
    value = value == undefined ? '':value;
    let current: string = value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex['decimal'])) {
        event.preventDefault();
    }
  }

}
