import { PaneraRecetaService } from '../panera-receta-service';
import { Component, ViewChild } from '@angular/core';
import { RecetaResponse } from '../models/receta.response';
import { TipoCategoriaResponse } from '../../administracion/tipocategoria/models/tipocategoria.response';
import { CategoriaResponse } from '../../administracion/categoria/models/categoria.response';
import { ProductoResponse } from '../../almacen/producto/producto/models/producto.response';
import { IntermedioResponse } from '../../almacen/intermedio/intermedio/models/intermedio.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { AdministracionTipoCategoriaService } from '../../administracion/tipocategoria/administracion-tipocategoria.service';
import { AdministracionCategoriaService } from '../../administracion/categoria/administracion-categoria.service';
import { TipoCategoriaRequest } from '../../administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from '../../administracion/categoria/models/categoria.request';
import { ParametroRequest } from '../../administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { AdministracionParametroService } from '../../administracion/parametro/administracion-parametro.service';
import { ParametroResponse } from '../../administracion/parametro/models/parametro.response';
import { IntermedioRequest } from '../../almacen/intermedio/intermedio/models/intermedio.request';
import { IntermedioService } from '../../almacen/intermedio/intermedio/intermedio.service';
import { PaneraParametro } from 'src/app/commons/util/panera-parametro';
import { RecetaDetalleResponse } from '../models/receta-detalle.response';
import { ProductoRequest } from '../../almacen/producto/producto/models/product.request';
import { ProductoService } from '../../almacen/producto/producto/producto.service';
import { RecetaRequest } from '../models/receta.request';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';
import { RecetaDetalleRequest } from '../models/receta-detalle.request';
import { ModalIntermedioComponent } from '../models/modal-intermedio/modal-intermedio.component';
import { ModalInsumoComponent } from '../models/modal-insumo/modal-insumo.component';

@Component({
    selector: 'app-receta-registro',
    templateUrl: './receta-registro.component.html',
    styleUrls: ['./receta-registro.component.scss'],
    providers: [
      PaneraUtils,
      IntermedioService,
      PaneraRecetaService,
      ProductoService,
      AdministracionParametroService,
      AdministracionCategoriaService,
      AdministracionTipoCategoriaService
    ]
  })

export class RecetaRegistroComponent {


  public idTipoCategoria = 0;
  public idCategoria = 0;
  public tipoCategorias: TipoCategoriaResponse[];

  public tipoRecetas: ParametroResponse[];
  public verIntermedio = false;
  public intermedios: IntermedioResponse[];
  public categoriasInsumo: CategoriaResponse[];
  public recetaDetalles: RecetaDetalleResponse[];
  public ingredientes: RecetaDetalleResponse[];
  public productos: ProductoResponse[];

  public categorias: CategoriaResponse[];
  public receta: RecetaResponse;
  public recetaRequest: RecetaRequest;

  public verNuevo = false;
  public verProducto = false;

  public inBusqueda = false;
  public currentPage = 1;
  public currentPageInsumo = 1;
  public itemsPerPage = 10;
  public itemsPerPageInsumo = 20;
  public pageSize: number;
  public pageSizeInsumo: number;

  constructor(private router: Router,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private recetaService: PaneraRecetaService,
              private productoService: ProductoService,
              private intermedioService: IntermedioService,
              private parametroService: AdministracionParametroService,
              private categoriaService: AdministracionCategoriaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService
             ) {
    this.receta = new RecetaResponse();
    this.ingredientes = [];
    this.recetaDetalles = [];
    this.intermedios = [];
    this.listarTipoRecetas();
    this.listarTipoCategorias();
    this.listarIntermedios();
    this.cargarReceta();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePageSize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }



  public onPageChangeInsumo(pageNumInsumo: number): void {
    this.pageSizeInsumo = this.itemsPerPageInsumo * (pageNumInsumo - 1);
  }

  public changePageSizeInsumo(numInsumo: number): void {
    this.itemsPerPageInsumo = this.pageSizeInsumo + numInsumo;
  }

  listarIntermedios() {
    const intermedioRequest = new IntermedioRequest();
    this.intermedioService.listarIntermedios(intermedioRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedios = data.result;
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

  listarCategoriasInsumo() {
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
  listarCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const categoriaRequest = new CategoriaRequest();
    categoriaRequest.idTipo = this.receta.idTipoCategoria;
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

  listarTipoCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
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

  cargarReceta() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idReceta') !== undefined) {
      const idReceta = Number(this.paneraUtils.obtenerGet('idReceta'));
      this.recetaService.obtenerReceta(idReceta).subscribe(
        data => {
          if (data.success) {
            this.receta = data.result;
            this.ingredientes = this.receta.ingredientes.slice();
            this.recetaDetalles = this.receta.ingredientes.slice();
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Receta');
            this.verBotones();
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
      this.verNuevo = true;
      this.receta = new RecetaResponse();
      this.receta.id = 0;
      this.receta.idTipo = 0;
      this.receta.idTipoCategoria = 0;
      this.receta.idCategoria = 0;
      this.receta.idProducto = 0;
      this.receta.idIntermedio = 0;
      this.ingredientes = [];
      //this.verBotones();
    }
  }
  cargarRecetaxID(id: number) {
      this.recetaService.obtenerReceta(id).subscribe(
        data => {
          if (data.success) {
            this.receta = data.result;
            this.ingredientes = this.receta.ingredientes.slice();
            this.recetaDetalles = this.receta.ingredientes.slice();
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Receta');
            this.verBotones();
          } 
        },
        err => {
          console.log(err);
          PaneraVistaUtils.mostrarLoading(false);
        }
      );
  }

  listarTipoRecetas() {
    const parametroRequest = new ParametroRequest();
    parametroRequest.idTipo = PaneraTipoParametro.ID_TIPOS_DE_RECETAS;
    this.parametroService.listarParametros(parametroRequest).subscribe(
      data => {
        if (data.success) {
          console.log(data.result)
          this.tipoRecetas = data.result;
          // this.listarIntermedios();
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
  }

  seleccionoTipoReceta() {
    const idTipo = Number(this.receta.idTipo);
    if (idTipo === 0) {
      this.receta.idTipoCategoria = 0;
      this.receta.idCategoria = 0;
      this.receta.idProducto = 0;
      this.receta.idIntermedio = 0;
    } else if (idTipo === PaneraParametro.ID_TIPO_RECETA_PRODUCTO) {
      this.receta.idTipoCategoria = 0;
      this.receta.idCategoria = 0;
      this.receta.idProducto = 0;
      this.receta.idIntermedio = 0;
    } else if (idTipo === PaneraParametro.ID_TIPO_RECETA_INTERMEDIO) {
      this.receta.idTipoCategoria = 0;
      this.receta.idCategoria = 0;
      this.receta.idProducto = 0;
      this.receta.idIntermedio = 0;
    }
    this.verBotones();
  }

  

  

  listarProductos() {
    PaneraVistaUtils.mostrarLoading(true);
    const productoRequest = new ProductoRequest();
    productoRequest.idCategoria = this.receta.idCategoria;
    productoRequest.nombre = '';
    this.productoService.listarProductos(productoRequest).subscribe(
      data => {
        if (data.success) {
          this.productos = data.result;
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
    this.idTipoCategoria = 0;
    this.idCategoria = 0;

    const modalRef = this.modalService.open(ModalInsumoComponent);
    modalRef.result.then((result) => {   
      console.log("result ", result);        
      this.ingredientes =[...this.ingredientes,...result];
    }, (reason) => {
      console.log("reason " + reason);
    });     
  }
  
  agregarIntermedio(modalIntermedio: any) {
    // this.intermedios.forEach(intermedio => {
    //   intermedio.activo = '0';
    // });

    const modalRef = this.modalService.open(ModalIntermedioComponent);
    modalRef.result.then((result) => {   
      console.log("result ", result);        
      this.ingredientes = [...this.ingredientes,...result];
    }, (reason) => {
      console.log("reason " + reason);
    });     
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }
 

  
  
  

  eliminarIngrediente(i: number) {
    this.ingredientes.splice(i, 1);
  }

  guardarReceta(successModal: any) {
    if (this.validarCampos()) {
      this.verNuevo = false;
      this.recetaRequest = new RecetaRequest();
      this.recetaRequest.idTipo = this.receta.idTipo;
      this.recetaRequest.idIntermedio = this.receta.idIntermedio;
      this.recetaRequest.idProducto = this.receta.idProducto;
      this.recetaRequest.cantidad = this.receta.cantidad;
      PaneraVistaUtils.mostrarLoading(true);
      if (this.receta.id > 0) {
        this.actualizarReceta(successModal);
      } else {
        this.registrarReceta(successModal);
      }
    }
  }

  registrarReceta(successModal: any) {
    this.recetaService.registrarReceta(this.recetaRequest).subscribe(
      data => {
        if (data.success) {
          this.receta = data.result;
          this.verBotones();
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_RECETA_OK);
          PaneraVistaUtils.cambiarBtnGuardar('Actualizar Receta');
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_RECETA_ERROR + ' ' + data.message);
          PaneraVistaUtils.mostrarLoading(false);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_RECETA_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  actualizarReceta(successModal: any) {
    this.recetaRequest.id = this.receta.id;
    this.recetaRequest.ingredientes = this.obtenerIngredientes();
    console.log("mostrar data ingredientes");
    console.log(this.recetaRequest.ingredientes);
    this.recetaService.actualizarReceta(this.recetaRequest).subscribe(
      data => {
        if (data.success) {
          this.receta = data.result;
          this.verBotones();
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_RECETA_OK);
          PaneraVistaUtils.cambiarBtnGuardar('Actualizar Receta');
          this.cargarRecetaxID(this.receta.id);
        } else {
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_RECETA_ERROR + ' ' + data.message);
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_RECETA_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  obtenerIngredientes(): RecetaDetalleRequest[] {
    const auxIngredientes: RecetaDetalleRequest[] = [];
    this.recetaDetalles.forEach(recetaDetalle => {
      let existeRecetaDetalle = false;
      this.ingredientes.forEach(ingrediente => {
        if (ingrediente.id === recetaDetalle.id) {
          existeRecetaDetalle = true;
        }
      });
      if (!existeRecetaDetalle) {
        const auxRecetaDetalle = new RecetaDetalleRequest();
        auxRecetaDetalle.id = recetaDetalle.id;
        auxRecetaDetalle.idIntermedio = recetaDetalle.idIntermedio;
        auxRecetaDetalle.idInsumo = recetaDetalle.idInsumo;
        auxRecetaDetalle.cantidad = recetaDetalle.cantidad;
        auxRecetaDetalle.activo = '0';
        auxIngredientes.push(auxRecetaDetalle);
      }
    });

    this.ingredientes.forEach(ingrediente => {
      const recetaDetalle = new RecetaDetalleRequest();
      recetaDetalle.id = ingrediente.id;
      recetaDetalle.idIntermedio = ingrediente.idIntermedio;
      recetaDetalle.idInsumo = ingrediente.idInsumo;
      recetaDetalle.cantidad = ingrediente.cantidad;
      recetaDetalle.activo = '1';
      auxIngredientes.push(recetaDetalle);
    });
    return auxIngredientes;
  }

  

  validarCampos(): boolean {
    let cont = 0;
    if (this.verNuevo) {
      if (Number(this.receta.idTipo) === 0) {
        PaneraVistaUtils.invalid('idTipo');
        cont = cont  + 1;
      } else {
        PaneraVistaUtils.valid('idTipo');
      }

      if (Number(this.receta.idTipo) === PaneraParametro.ID_TIPO_RECETA_PRODUCTO) {
        if (Number(this.receta.idProducto) === 0) {
          PaneraVistaUtils.invalid('idProducto');
          cont = cont + 1;
        } else {
          PaneraVistaUtils.valid('idProducto');
        }
      }

      if (Number(this.receta.idTipo) === PaneraParametro.ID_TIPO_RECETA_INTERMEDIO) {
        if (Number(this.receta.idIntermedio) === 0) {
          PaneraVistaUtils.invalid('idIntermedio');
          cont  = cont + 1;
        } else {
          PaneraVistaUtils.valid('idIntermedio');
        }
      }
    } else {
      if (String(this.receta.cantidad) === '' || Number(this.receta.cantidad) === 0) {
        PaneraVistaUtils.invalid('cantidad');
        cont = cont + 1;
      } else {
        PaneraVistaUtils.valid('cantidad');
      }
    }

    if (cont > 0) {
      return false;
    } else {
      return true;
    }
  }

  limpiarCampos() {
    this.validarCampos();
  }

  cancelar() {
    this.router.navigate(['receta']);
  }

  keyPressCantidad(event: KeyboardEvent) {
    const specialKeys = {
      string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
      number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
      decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
  };
  if (specialKeys['number'].indexOf(event.key) !== -1) {
      return;
  } 
    const regex = {
        string: new RegExp(/^[a-zA-Z]/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    } ;
    let value = this.receta.cantidad == undefined ? '' :this.receta.cantidad;
    value = value == 0 ? '' :this.receta.cantidad;
      let current: string = value.toString();
      let next: string = current.concat(event.key);
      if (next && !String(next).match(regex['decimal'])) {
          event.preventDefault();
      }
  }

   verBotones() {
    const idTipo = Number(this.receta.idTipo);
    if (idTipo === 0) {
      this.verIntermedio = false;
      this.verProducto = false;
    }
    if (idTipo === PaneraParametro.ID_TIPO_RECETA_INTERMEDIO) {
      this.verIntermedio = true;
      this.verProducto = false;
    } else if (idTipo === PaneraParametro.ID_TIPO_RECETA_PRODUCTO) {
      this.verIntermedio = false;
      this.verProducto = true;
    }
    if (Number(this.receta.id) > 0) {
      this.verNuevo = false;
    } else {
      this.verNuevo = true;
    }
  }

}
