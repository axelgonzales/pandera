import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionCategoriaService } from '../administracion-categoria.service';
import { CategoriaResponse } from '../models/categoria.response';
import { CategoriaRequest } from '../models/categoria.request';
import { AdministracionTipoCategoriaService } from '../../tipocategoria/administracion-tipocategoria.service';
import { TipoCategoriaRequest } from '../../tipocategoria/models/tipocategoria.request';
import { TipoCategoriaResponse } from '../../tipocategoria/models/tipocategoria.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-categoria-bandeja',
    templateUrl: './categoria-bandeja.component.html',
    styleUrls: ['./categoria-bandeja.component.scss'],
    providers: [
      AdministracionCategoriaService,
      AdministracionTipoCategoriaService,
    ]
  })

export class CategoriaBandejaComponent {

  public nombre = '';
  public idTipo = 0;

  public categoriaRequest: CategoriaRequest;
  public tipoCategorias: TipoCategoriaResponse[];
  public categorias: CategoriaResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router,
              private categoriaService: AdministracionCategoriaService,
              private tipoCategoriaService: AdministracionTipoCategoriaService) {
    this.categorias = [];
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
    tipoCategoriaRequest.tipo = '';
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

  buscarCategoria() {
    PaneraVistaUtils.mostrarLoading(true);
    this.categoriaRequest = new CategoriaRequest();
    this.categoriaRequest.nombre = this.nombre;
    this.categoriaRequest.idTipo = this.idTipo;
    this.categoriaService.listarCategorias(this.categoriaRequest).subscribe(
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

  agregarCategoria() {
    this.router.navigate(['administracion/categoria/registro']);
  }

  editarCategoria(idCategoria: number) {
    location.href = '#/administracion/categoria/registro?idCategoria=' + idCategoria;
  }

}
