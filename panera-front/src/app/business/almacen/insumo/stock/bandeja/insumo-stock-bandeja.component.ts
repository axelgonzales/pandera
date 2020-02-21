import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InsumoStockService } from '../insumo-stock.service';
import { InsumoStockResponse } from '../models/insumo-stock.response';
import { InsumoStockRequest } from '../models/insumo-stock-request';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { InsumoResponse } from '../../insumo/models/insumo.response';
import { MarcaResponse } from 'src/app/business/administracion/marca/models/marca.response';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { ProveedorResponse } from 'src/app/business/administracion/proveedor/models/proveedor.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { InsumoRequest } from '../../insumo/models/insumo.request';
import { InsumoService } from '../../insumo/insumo.service';
import { MarcaRequest } from 'src/app/business/administracion/marca/models/marca.request';
import { AdministracionMarcaService } from 'src/app/business/administracion/marca/administracion-marca.service';
import { ProveedorRequest } from 'src/app/business/administracion/proveedor/models/proveedor.request';
import { AdministracionProveedorService } from 'src/app/business/administracion/proveedor/administracion-proveedor.service';

@Component({
    selector: 'app-insumo-stock-bandeja',
    templateUrl: './insumo-stock-bandeja.component.html',
    styleUrls: ['./insumo-stock-bandeja.component.scss'],
    providers: [
      InsumoStockService,
      InsumoService,
      AdministracionMarcaService,
      AdministracionCategoriaService,
      AdministracionProveedorService,
      AdministracionTipoCategoriaService,
    ]
  })

export class InsumoStockBandejaComponent {

  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];
  public insumos: InsumoResponse[];
  public proveedores: ProveedorResponse[];
  public marcas: MarcaResponse[];

  public idTipoCategoria = 0;
  public idCategoria = 0;
  public idInsumo = 0;
  public idProveedor = 0;
  public idMarca = 0;

  public currentPage = 1;
  public itemsPerPage = 50;
  public pageSize: number;
  public valor = false;

  public insumosStock: InsumoStockResponse[];
  public insumoStockRequest: InsumoStockRequest;

  constructor(private router: Router,
              private insumoStockService: InsumoStockService,
              private insumoService: InsumoService,
              private marcaService: AdministracionMarcaService,
              private categoriaService: AdministracionCategoriaService,
              private proveedorService: AdministracionProveedorService,
              private tipoCategoriaService: AdministracionTipoCategoriaService) {
    this.insumoStockRequest = new InsumoStockRequest();
    this.listarTipoCategorias();
    this.listarMarcas();
    this.listarProveedores();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarTipoCategorias() {
    this.tipoCategoriaService.listarTipoCategorias(new TipoCategoriaRequest()).subscribe(
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
    this.proveedorService.listarProveedores(proveedorRequest).subscribe(
      data => {
        if (data.success) {
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

  buscarInsumosStock() {
    this.insumoStockRequest.idProveedor = this.idProveedor;
    this.insumoStockRequest.idInsumo = this.idInsumo;
    this.insumoStockRequest.idMarca = this.idMarca;
    this.insumoStockService.listarInsumosStock(this.insumoStockRequest).subscribe(
      data => {
        if (data.success) {
          this.insumosStock = data.result;
          this.valor = true;
        } else {
          console.log(data.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
