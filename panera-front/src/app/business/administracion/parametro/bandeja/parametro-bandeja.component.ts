import { AdministracionParametroService } from '../administracion-parametro.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParametroResponse } from '../models/parametro.response';
import { ParametroRequest } from '../models/parametro.request';
import { AdministracionTipoParametroService } from '../../tipoparametro/administracion-tipo-parametro.service';
import { TipoParametroRequest } from '../../tipoparametro/models/tipo-parametro.request';
import { TipoParametroResponse } from '../../tipoparametro/models/tipo-parametro.response';

@Component({
    selector: 'app-parametro-bandeja',
    templateUrl: './parametro-bandeja.component.html',
    styleUrls: ['./parametro-bandeja.component.scss'],
    providers: [ 
      AdministracionParametroService,
      AdministracionTipoParametroService,
    ]
  })

export class ParametroBandejaComponent {

  public parametrosResponse: ParametroResponse;
  public parametroRequest: ParametroRequest;
  public tipoParametros: TipoParametroResponse[];
  public parametros: ParametroResponse[];
  public loading: boolean;
  public verBotones: boolean;
  public nombre: string;
  public idTipo: number;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize: number;
  public valor: boolean;

  constructor(private router: Router, 
              private parametroService: AdministracionParametroService,
              private tipoParametroService: AdministracionTipoParametroService){
    this.parametroRequest = new ParametroRequest();
    this.nombre = '';
    this.idTipo = 0;
    this.verBotones = false;
    this.listarTipoParametros();
    this.valor = false;
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarTipoParametros() {
    this.mostrarLoading(true);
    const tipoParametroRequest = new TipoParametroRequest();
    tipoParametroRequest.nombre = '';
    this.tipoParametroService.listarTipoParametros(tipoParametroRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoParametros = data.result;
        } else {
          console.log(data.message);
        }
        this.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.mostrarLoading(false);
      }
    );
  }

  buscarParametros(){
    this.mostrarLoading(true);
    this.parametroRequest.nombre = this.nombre;
    this.parametroRequest.idTipo = this.idTipo;
    this.parametroService.listarParametros(this.parametroRequest).subscribe(
      data => {
        if (data.success) {
          this.parametros = data.result;
          this.valor = true;
        } else {
          console.log(data.message);
        }
        this.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.mostrarLoading(false);
      }
    );
  }

  agregarParametro(){
    this.router.navigate(['administracion/parametro/registro']);
  }

  editarParametros(idParametro: number) {
    location.href = '#/administracion/parametro/registro?idParametro=' + idParametro;
  }

  mostrarLoading(estado: boolean){
    var val = (estado == true) ? "block":"none";
    var load = document.getElementById('loaderOverlay');
    load.style.display = val;
    this.verBotones = !estado;
  }


}
