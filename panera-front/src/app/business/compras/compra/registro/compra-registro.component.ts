import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompraResponse } from '../models/compra.response';
import { CompraRequest } from '../models/compra.request';
import { ComprasCompraService } from '../compras-compra.service';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { ParametroResponse } from 'src/app/business/administracion/parametro/models/parametro.response';
import { ProveedorResponse } from 'src/app/business/administracion/proveedor/models/proveedor.response';
import { InsumoResponse } from 'src/app/business/almacen/insumo/insumo/models/insumo.response';
import { AdministracionProveedorService } from 'src/app/business/administracion/proveedor/administracion-proveedor.service';
import { AdministracionParametroService } from 'src/app/business/administracion/parametro/administracion-parametro.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { ProveedorRequest } from 'src/app/business/administracion/proveedor/models/proveedor.request';
import { ParametroRequest } from 'src/app/business/administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { InsumoRequest } from 'src/app/business/almacen/insumo/insumo/models/insumo.request';
import { InsumoService } from 'src/app/business/almacen/insumo/insumo/insumo.service';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { AdministracionMarcaService } from 'src/app/business/administracion/marca/administracion-marca.service';
import { MarcaResponse } from 'src/app/business/administracion/marca/models/marca.response';
import { MarcaRequest } from 'src/app/business/administracion/marca/models/marca.request';
import { PaneraEstado } from 'src/app/commons/util/panera-estado';
import { CompraDetalleResponse } from '../models/compra-detalle.response';
import { CompraDetalleRequest } from '../models/compra-detalle.request';

@Component({
    selector: 'app-compra-registro',
    templateUrl: './compra-registro.component.html',
    styleUrls: ['./compra-registro.component.scss'],
    providers: [
      ComprasCompraService,
      AdministracionProveedorService,
      AdministracionParametroService,
      AdministracionTipoCategoriaService,
      AdministracionCategoriaService,
      AdministracionMarcaService,
      InsumoService,
      PaneraUtils,
    ]
  })
export class CompraRegistroComponent {
  numericoPrecio : boolean = false;
  public compraRequest: CompraRequest;
  public compra: CompraResponse;
  public compras: CompraResponse[];
  public compraDetalles: CompraDetalleResponse[];
  public tipoDocumentos: ParametroResponse[];
  public proveedores: ProveedorResponse[];
  public condicionPagos: ParametroResponse[];
  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];
  public insumos: InsumoResponse[];
  public marcas: MarcaResponse[];

  public verBtnPedir = false;
  public verBtnGuardar = false;
  public verBtnAlmacenar = false;
  public verBtnAgregar = false;
  public verCamposRegistro = false;
  public verCamposAgregar = false;

  public fechaEmision;
  public fechaCancelacion;

  public idInsumoCompra = 0;
  public idTipoCategoria = 0;
  public idCategoria = 0;
  public idInsumo = 0;
  public idMarca = 0;
  public precio = 0;
  public cantidad = 0;
  public position = -1;

  public currentPage = 1;
  public currentPageInsumo = 1;
  public itemsPerPage = 10;
  public itemsPerPageInsumo = 30;
  public pageSize: number;
  public pageSizeInsumo: number;

  constructor(private router: Router,
              private modalService: NgbModal,
              private compraService: ComprasCompraService,
              private insumoService: InsumoService,
              private proveedorService: AdministracionProveedorService,
              private parametroService: AdministracionParametroService,
              private marcaService: AdministracionMarcaService,
              private categoriaService: AdministracionCategoriaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService,
              private paneraUtils: PaneraUtils,
              ) {
    this.compraRequest = new CompraRequest();
    this.listarProveedores();
    this.listarTipoCategorias();
    this.listarMarcas();
    this.cargarCompra();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public onPageChangeInsumo(pageNumInsumo: number): void {
    this.pageSizeInsumo = this.itemsPerPageInsumo * (pageNumInsumo - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  public changePageSizeInsumo(numInsumo: number): void {
    this.itemsPerPageInsumo = this.pageSizeInsumo + numInsumo;
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
    const tipoDocumentoRequest = new ParametroRequest();
    tipoDocumentoRequest.idTipo = PaneraTipoParametro.ID_DOCUMENTOS_DE_COMPRA;
    this.parametroService.listarParametros(tipoDocumentoRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoDocumentos = data.result;
          this.listarCondicionesPago();
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

  listarCondicionesPago() {
    const condicionPagoRequest = new ParametroRequest();
    condicionPagoRequest.idTipo = PaneraTipoParametro.ID_CONDICIONES_DE_PAGO;
    this.parametroService.listarParametros(condicionPagoRequest).subscribe(
      data => {
        if (data.success) {
          this.condicionPagos = data.result;
          this.listarMarcas();
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

  listarTipoCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const tipoCategoriaRequest = new TipoCategoriaRequest();
    tipoCategoriaRequest.nombre = '';
    tipoCategoriaRequest.tipo = 'I';
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
    categoriaRequest.idTipo = this.idTipoCategoria;
    categoriaRequest.nombre = '';
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
    insumoRequest.nombre = '';
    this.insumoService.listarInsumos(insumoRequest).subscribe(
      data => {
        if (data.success) {
          this.insumos = data.result;
          this.insumos.forEach(insumo => {
            insumo.activo = '0';
          });
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

  agregarInsumo(modalInsumo: any) {
    this.insumos = [];
    this.idTipoCategoria = 0;
    this.idCategoria = 0;
    this.modalService.open(modalInsumo);
  }

  seleccionoInsumo(i: number) {
    this.insumos[i].activo = '1';
  }

  agregarInsumos() {
    this.insumos.forEach(insumo => {
      if (insumo.activo === '1') {
        let noExisteInsumo = true;
        console.log(this.compraDetalles);
        console.log(insumo);
        this.compraDetalles.forEach(insumoCompra => {
          if (insumoCompra.nomInsumo === insumo.nombre) {
            noExisteInsumo = false;
          }
        });
        if (noExisteInsumo) {
          const compraDetalle = new CompraDetalleResponse();
          compraDetalle.id = 0;
          compraDetalle.idInsumo = insumo.id;
          compraDetalle.nomInsumo = insumo.nombre;
          compraDetalle.cantidad = 1;
          compraDetalle.precioTotal = 0;
          compraDetalle.precioUnitario = 0;
          this.compraDetalles.push(compraDetalle);
        }
      }
    });
    this.modalService.dismissAll();
  }

  cargarCompraId(id){
      this.compraService.obtenerCompra(id).subscribe(
        data => {
          if (data.success) {
            this.compra = data.result;
            if (this.compra.fechaEmision !== null) {
              this.fechaEmision = PaneraUtils.obtenerFechaView(this.compra.fechaEmision);
            }
            if (this.compra.fechaCancelacion !== null) {
              this.fechaCancelacion = PaneraUtils.obtenerFechaView(this.compra.fechaCancelacion);
            }
            this.compraDetalles = this.compra.insumos.slice();
            this.verBotones(this.compra);
            PaneraVistaUtils.changeValue('Actualizar Compra');
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

  cargarCompra() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idCompra') !== undefined) {
      const idCompra = +this.paneraUtils.obtenerGet('idCompra');
      this.compraService.obtenerCompra(idCompra).subscribe(
        data => {
          if (data.success) {
            this.compra = data.result;
            if (this.compra.fechaEmision !== null) {
              this.fechaEmision = PaneraUtils.obtenerFechaView(this.compra.fechaEmision);
            }
            if (this.compra.fechaCancelacion !== null) {
              this.fechaCancelacion = PaneraUtils.obtenerFechaView(this.compra.fechaCancelacion);
            }
            this.compraDetalles = this.compra.insumos.slice();
            this.verBotones(this.compra);
            PaneraVistaUtils.changeValue('Actualizar Compra');
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
      this.compra = new CompraResponse();
      this.compra.insumos = [];
      this.compraDetalles = [];
      this.verBotones(this.compra);
    }
  }

  guardarCompra(content1: any) {
    if (this.validarCompra()) {
      PaneraVistaUtils.mostrarLoading(true);
      if (String(this.compra.id) === '0') {
        this.registrarCompra(content1);
      } else {
        this.actualizarCompra(content1);
      }
    }
  }

  registrarCompra(content1: any) {
    this.compraRequest.idProveedor = this.compra.idProveedor;
    this.compraRequest.serie = this.compra.serie;
    this.compraRequest.idCondicionPago = this.compra.idCondicionPago;
    this.compraRequest.idModoPago = this.compra.idModoPago;
    this.compraRequest.idTipoDocumento = this.compra.idTipoDocumento;
    this.compraRequest.documento = this.compra.documento;
    if (this.fechaEmision !== undefined && this.fechaEmision !== '') {
      this.compraRequest.fechaEmision = PaneraUtils.obtenerFecha(this.fechaEmision);
    }
    if (this.fechaCancelacion !== undefined && this.fechaCancelacion !== '') {
      this.compraRequest.fechaCancelacion = PaneraUtils.obtenerFecha(this.fechaCancelacion);
    }
    const listaInsumoCompra = this.obtenerInsumoCompras();
    this.compraRequest.insumos = listaInsumoCompra;
    this.compraService.registrarCompra(this.compraRequest).subscribe(
      data => {
        if (data.success) {
          this.compra = data.result;
          this.modalService.open(content1);
          this.verBotones(this.compra);
          PaneraVistaUtils.changeValue('Actualizar Compra');
          PaneraVistaUtils.showSuccess('Se registró correctamente la compra.');
          this.cargarCompraId(this.compra.id);
        } else {
          console.log(data.message);
          this.modalService.open(content1);
          PaneraVistaUtils.showSuccess('No se pudo registrar la compra.');
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(content1);
        PaneraVistaUtils.showSuccess('Ocurrio un error al registrar la compra.');
      }
    );
  }

  actualizarCompra(content1: any) {
    this.compraRequest.id = this.compra.id;
    this.compraRequest.serie = this.compra.serie;
    this.compraRequest.idProveedor = this.compra.idProveedor;
    this.compraRequest.idCondicionPago = this.compra.idCondicionPago;
    this.compraRequest.idModoPago = this.compra.idModoPago;
    this.compraRequest.idTipoDocumento = this.compra.idTipoDocumento;
    this.compraRequest.documento = this.compra.documento;
    if (this.fechaEmision !== undefined && this.fechaEmision !== '') {
      this.compraRequest.fechaEmision = PaneraUtils.obtenerFecha(this.fechaEmision);
    }
    if (this.fechaCancelacion !== undefined && this.fechaCancelacion !== '') {
      this.compraRequest.fechaCancelacion = PaneraUtils.obtenerFecha(this.fechaCancelacion);
    }
    const listaInsumoCompra = this.obtenerInsumoCompras();
    this.compraRequest.insumos = listaInsumoCompra;
    this.compraService.actualizarCompra(this.compraRequest).subscribe(
      data => {
        if (data.success) {
          this.compra = data.result;
          this.modalService.open(content1);
          this.cargarCompraId(this.compra.id);
          this.verBotones(this.compra);
          if (Number(this.compra.idEstado) === PaneraEstado.ID_COMPRA_REGISTRADO) {
            PaneraVistaUtils.showSuccess('Se actualizó correctamente la compra.');
          } else if (Number(this.compra.idEstado) === PaneraEstado.ID_COMPRA_PEDIDO) {
            PaneraVistaUtils.showSuccess('Se solicitó correctamente la compra.');
          } else if (Number(this.compra.idEstado) === PaneraEstado.ID_COMPRA_ENVIADO_ALMACEN) {
            PaneraVistaUtils.showSuccess('Se envió a almacen correctamente la compra.');
          }
        } else {
          console.log(data.message);
          this.modalService.open(content1);
          PaneraVistaUtils.showSuccess('No se pudo actualizar la compra.');
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(content1);
        PaneraVistaUtils.showSuccess('Ocurrio un error al actualizar la compra.');
      }
    );
  }

  pedirCompra(content1: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.compraRequest.idEstado = PaneraEstado.ID_COMPRA_PEDIDO;
    this.actualizarCompra(content1);
  }

  almacenarCompra(content1: any) {
    PaneraVistaUtils.mostrarLoading(true);
    this.compraRequest.idEstado = PaneraEstado.ID_COMPRA_ENVIADO_ALMACEN;
    this.actualizarCompra(content1);
  }

  validarCompra() {
    let esValido = true;
    if (String(this.compra.idProveedor) === '0') {
      PaneraVistaUtils.invalid('cmbProveedor');
      esValido = false;
    }
    return esValido;
  }

  obtenerInsumoCompras(): CompraDetalleRequest[] {
    const auxInsumosCompra: CompraDetalleRequest[] = [];
    this.compraDetalles.forEach(insumoCompra => {
        const insumoCompraRequest = new CompraDetalleRequest();
        insumoCompraRequest.id = insumoCompra.id;
        insumoCompraRequest.idInsumo = insumoCompra.idInsumo;
        insumoCompraRequest.idMarca = insumoCompra.idMarca;
        insumoCompraRequest.precioUnitario = insumoCompra.precioUnitario;
        insumoCompraRequest.precioTotal = insumoCompra.precioTotal;
        insumoCompraRequest.cantidad = insumoCompra.cantidad;
        insumoCompraRequest.activo = PaneraConstantes.IN_ACTIVO;
        auxInsumosCompra.push(insumoCompraRequest);
    });
    this.compra.insumos.forEach(insumo => {
      const index = this.compraDetalles.findIndex(item => Number(item.id) === Number(insumo.id));
      if (index < 0) {
        const insumoCompraRequest = new CompraDetalleRequest();
        insumoCompraRequest.id = insumo.id;
        insumoCompraRequest.idInsumo = insumo.idInsumo;
        insumoCompraRequest.idMarca = insumo.idMarca;
        insumoCompraRequest.precioUnitario = insumo.precioUnitario;
        insumoCompraRequest.precioTotal = insumo.precioTotal;
        insumoCompraRequest.cantidad = insumo.cantidad;
        insumoCompraRequest.activo = PaneraConstantes.IN_INACTIVO;
        auxInsumosCompra.push(insumoCompraRequest);
      }
    });

    return auxInsumosCompra;
  }

  verBotones(compra: CompraResponse) {
    if (Number(compra.idEstado) === 0) {
      this.verBtnGuardar = true;
      this.verBtnAgregar = true;
      this.verBtnPedir = false;
      this.verBtnAlmacenar = false;
      this.verCamposRegistro = false;
      this.verCamposAgregar = false;
    } else if (Number(compra.idEstado) === PaneraEstado.ID_COMPRA_REGISTRADO) {
      this.verBtnGuardar = true;
      this.verBtnAgregar = true;
      this.verBtnPedir = true;
      this.verBtnAlmacenar = false;
      this.verCamposRegistro = false;
      this.verCamposAgregar = false;
    } else if (Number(compra.idEstado) === PaneraEstado.ID_COMPRA_PEDIDO) {
      this.verBtnGuardar = true;
      this.verBtnAgregar = false;
      this.verBtnPedir = false;
      this.verBtnAlmacenar = true;
      this.verCamposRegistro = true;
      this.verCamposAgregar = true;
    } else if (Number(compra.idEstado) === PaneraEstado.ID_COMPRA_ALMACENADO) {
      this.verBtnGuardar = false;
      this.verBtnAgregar = false;
      this.verBtnPedir = false;
      this.verBtnAlmacenar = false;
      this.verCamposRegistro = false;
      this.verCamposAgregar = true;
    }
  }

  cancelar() {
    this.router.navigate(['compras/compra']);
  }

  keyPressPrecio(event: KeyboardEvent, precio) {
    console.log('precio',precio);
    precio = precio == undefined ? '': precio;
    const regex = {
        string: new RegExp(/^[a-zA-Z]/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    } ;

    const specialKeys = {
        string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };
    if (specialKeys['decimal'].indexOf(event.key) !== -1) {
        return;
    }

    precio = precio == 0 ? '': precio;

    let current: string = precio;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex['decimal'])) {
        event.preventDefault();
    }
  }
  
  keyPressCantidad (event: KeyboardEvent,cantidad) {
    console.log(cantidad);
    const regex = {
      string: new RegExp(/^[a-zA-Z]/),
      number: new RegExp(/^\d+$/),
      decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    } ;

    const specialKeys = {
        string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };
    if (specialKeys['decimal'].indexOf(event.key) !== -1) {
        return;
    }

    
    cantidad = cantidad == undefined ? '': cantidad;
    // cantidad = cantidad === 1.00 ? '': cantidad;
    cantidad = cantidad == 0 ? '': cantidad;

    let current: string = cantidad;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex['decimal'])) {
        event.preventDefault();
    }
  }
  keyPressNumber(event: KeyboardEvent,value) {
    const regex = {
      string: new RegExp(/^[a-zA-Z]/),
      number: new RegExp(/^\d+$/),
      decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    } ;

    const specialKeys = {
        string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };
    if (specialKeys['decimal'].indexOf(event.key) !== -1) {
        return;
    } 
    value = value == undefined ? '': value;
    value = value == 0 ? '':value;
    let current: string = value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex['decimal'])) {
        event.preventDefault();
    }
  }
  eliminarInsumoCompra(id){
    const list = [];
    let contador = 0;
    this.compraDetalles.forEach(element => {
      
      console.log(contador, " ad ", id);
      if (contador  !== id ) {
        list.push(element);
      }
      contador +=1;
    });
    this.compraDetalles = list;
  }
}
