import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionTipoCategoriaService } from '../administracion-tipocategoria.service';
import { TipoCategoriaResponse } from '../models/tipocategoria.response';
import { TipoCategoriaRequest } from '../models/tipocategoria.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-tipocategoria-bandeja',
    templateUrl: './tipocategoria-bandeja.component.html',
    styleUrls: ['./tipocategoria-bandeja.component.scss'],
    providers: [ AdministracionTipoCategoriaService ]
  })

export class TipoCategoriaBandejaComponent{

  public nombre = '';
  public tipo = '';

  public tipoCategoriaRequest: TipoCategoriaRequest;
  public tipoCategorias: TipoCategoriaResponse[];


  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public valor: boolean;

  constructor(private router: Router, private tipcategoria: AdministracionTipoCategoriaService) {
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  agregarTipoCategoria() {
    this.router.navigate(['administracion/tipocategoria/registro']);
  }

  buscarTipoCategoria() {
    PaneraVistaUtils.mostrarLoading(true);
    this.tipoCategoriaRequest = new TipoCategoriaRequest();
    this.tipoCategoriaRequest.tipo = this.tipo;
    this.tipoCategoriaRequest.nombre = this.nombre;
    this.tipcategoria.listarTipoCategorias(this.tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategorias = data.result;
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

  editarTipCategoria(idTipoCategoria: number) {
    location.href = '#/administracion/tipocategoria/registro?idTipoCategoria=' + idTipoCategoria;
  }

}
