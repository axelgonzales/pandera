import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InsumoService } from '../insumo.service';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { InsumoResponse } from '../models/insumo.response';
import { InsumoRequest } from '../models/insumo.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-insumo-bandeja',
    templateUrl: './insumo-bandeja.component.html',
    styleUrls: ['./insumo-bandeja.component.scss'],
    providers: [
      InsumoService,
      AdministracionTipoCategoriaService,
      AdministracionCategoriaService,
    ]
  })

export class InsumoBandejaComponent {

  public idTipoCategoria: number;
  public idCategoria: number;
  public nombre: string;
  public insumos: InsumoResponse[];
  public insumo: InsumoResponse;
  public insumoRequest: InsumoRequest;
  public tipocategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 30;
  public pageSize: number;
  public valor: boolean;

  constructor(private router: Router,
              private insumoService: InsumoService,
              private tipoCategoriaService: AdministracionTipoCategoriaService,
              private categoriaService: AdministracionCategoriaService) {
    this.idTipoCategoria = 0;
    this.idCategoria = 0;
    this.insumoRequest = new InsumoRequest();
    this.insumos = [];
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
    tipoCategoriaRequest.tipo = 'I';
    tipoCategoriaRequest.nombre = '';
    this.tipoCategoriaService.listarTipoCategorias(tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipocategorias = data.result;
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

  listarCategorias(idTipo) {
    PaneraVistaUtils.mostrarLoading(true);
    const categoriaRequest = new CategoriaRequest();
    categoriaRequest.nombre = '';
    categoriaRequest.idTipo = idTipo;
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
    this.insumoRequest.idCategoria = this.idCategoria;
    this.insumoRequest.nombre = this.nombre === undefined ? '' : this.nombre;
    this.insumoService.listarInsumos(this.insumoRequest).subscribe(
      data => {
        if (data.success) {
          this.inBusqueda = true;
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

  agregarInsumo(){
    this.router.navigate(['almacen/insumo/insumo/registro']);
  }

  editarInsumo(idInsumo: number) {
    location.href = '#/almacen/insumo/insumo/registro?idInsumo=' + idInsumo;
  }

}
