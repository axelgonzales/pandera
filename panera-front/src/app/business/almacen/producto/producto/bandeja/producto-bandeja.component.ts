import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { ProductoResponse } from '../models/producto.response';
import { ProductoRequest } from '../models/product.request';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';

@Component({
    selector: 'app-producto-bandeja',
    templateUrl: './producto-bandeja.component.html',
    styleUrls: ['./producto-bandeja.component.scss'],
    providers: [
      ProductoService,
      AdministracionCategoriaService,
      AdministracionTipoCategoriaService,
    ]
  })

export class ProductoBandejaComponent {

  public idTipoCategoria = 0;
  public idCategoria = 0;
  public nombre = '';

  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];

  public productos: ProductoResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public valor = false;

  constructor(private router: Router,
              private productoService: ProductoService,
              private tipoCategoriaService: AdministracionTipoCategoriaService,
              private categoriaService: AdministracionCategoriaService) {
    this.productos = [];
    this.listarTipoCategorias();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarTipoCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const tipocategoriaRequest = new TipoCategoriaRequest();
    tipocategoriaRequest.tipo = 'P';
    tipocategoriaRequest.nombre = '';
    this.tipoCategoriaService.listarTipoCategorias(tipocategoriaRequest).subscribe(
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
    PaneraVistaUtils.mostrarLoading(true);
    const productoRequest = new ProductoRequest();
    productoRequest.idTipoCategoria = this.idTipoCategoria;
    productoRequest.idCategoria = this.idCategoria;
    productoRequest.nombre = this.nombre;
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

  agregarProducto() {
    this.router.navigate(['almacen/producto/producto/registro']);
  }

  editarProducto(idProducto: number) {
    location.href = '#/almacen/producto/producto/registro?idProducto=' + idProducto;
  }

}
