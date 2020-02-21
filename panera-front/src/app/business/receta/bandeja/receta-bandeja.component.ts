import { Component } from '@angular/core';
import { PaneraRecetaService } from '../panera-receta-service';
import { RecetaResponse } from '../models/receta.response';
import { RecetaRequest } from '../models/receta.request';
import { Router } from '@angular/router';
import { AdministracionParametroService } from '../../administracion/parametro/administracion-parametro.service';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { ParametroRequest } from '../../administracion/parametro/models/parametro.request';
import { PaneraTipoParametro } from 'src/app/commons/util/panera-tipo-parametro';
import { ParametroResponse } from '../../administracion/parametro/models/parametro.response';

@Component({
    selector: 'app-receta-bandeja',
    templateUrl: './receta-bandeja.component.html',
    styleUrls: ['./receta-bandeja.component.scss'],
    providers: [
      PaneraRecetaService,
      AdministracionParametroService,
    ]
  })

export class RecetaBandejaComponent {

  public idTipoReceta = 0;
  public nomReceta = '';

  public tipoRecetas: ParametroResponse[];
  public recetaRequest: RecetaRequest;
  public recetas: RecetaResponse[];

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public loading: boolean;

  constructor(private router: Router,
              private recetaService: PaneraRecetaService,
              private parametroService: AdministracionParametroService) {
    this.recetas = [];
    this.recetaRequest = new RecetaRequest();
    this.listarTipoRecetas();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarTipoRecetas() {
    PaneraVistaUtils.mostrarLoading(true);
    const parametroRequest = new ParametroRequest();
    parametroRequest.idTipo = PaneraTipoParametro.ID_TIPOS_DE_RECETAS;
    this.parametroService.listarParametros(parametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoRecetas = data.result;
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

  buscarRecetas() {
    PaneraVistaUtils.mostrarLoading(true);
    this.recetaRequest.idTipo = this.idTipoReceta;
    this.recetaRequest.nomReceta = this.nomReceta;
    this.recetaService.listarRecetas(this.recetaRequest).subscribe(
      data => {
        if (data.success) {
          this.recetas = data.result;
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

  agregarReceta() {
    this.router.navigate(['receta/registro']);
  }

  editarReceta(idReceta: number) {
    location.href = '#/receta/registro?idReceta=' + idReceta;
  }

}
