import { Component } from '@angular/core';
import { ProductoStockService } from '../producto-stock.service';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { ProductoStockResponse } from '../models/producto-stock.response';
import { ProductoStockRequest } from '../models/producto-stock.request';
import { Router } from '@angular/router';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';

@Component({
    selector: 'app-producto-stock-bandeja',
    templateUrl: './producto-stock-bandeja.component.html',
    styleUrls: ['./producto-stock-bandeja.component.scss'],
    providers: [
      ProductoStockService,
      AdministracionCategoriaService,
      AdministracionTipoCategoriaService,
     ]
  })
export class ProductoStockBandejaComponent {

  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];

  public idTipoCategoria = 0;
  public idCategoria = 0;
  public numPedido = '';

  public currentPage = 1;
  public itemsPerPage = 50;
  public pageSize: number;
  public valor = false;

  public productosStock: ProductoStockResponse[];
  public productoStockRequest: ProductoStockRequest;

  constructor(private productoStockService: ProductoStockService,
              private categoriaService: AdministracionCategoriaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService) {
    this.productosStock = [];
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
    const tipoCategoriaRequest = new TipoCategoriaRequest();
    tipoCategoriaRequest.tipo = 'P';
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

  listarStockProductos() {
    PaneraVistaUtils.mostrarLoading(true);
    this.productoStockRequest = new ProductoStockRequest();
    this.productoStockRequest.idTipoCategoria = this.idTipoCategoria;
    this.productoStockRequest.idCategoria = this.idCategoria;
    this.productoStockRequest.numPedido = this.numPedido;
    this.productoStockService.listarProductosStock(this.productoStockRequest).subscribe(
      data => {
        if (data.success) {
          this.productosStock = data.result;
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

}
