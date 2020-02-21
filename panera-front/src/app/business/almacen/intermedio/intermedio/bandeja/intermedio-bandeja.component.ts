import { Component } from '@angular/core';
import { IntermedioService } from '../intermedio.service';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { IntermedioResponse } from '../models/intermedio.response';
import { IntermedioRequest } from '../models/intermedio.request';
import { Router } from '@angular/router';

@Component({
    selector: 'app-intermedio-bandeja',
    templateUrl: './intermedio-bandeja.component.html',
    styleUrls: ['./intermedio-bandeja.component.scss'],
    providers: [
      IntermedioService,
    ]
  })
export class IntermedioBandejaComponent {

  public nombre = '';
  public intermedios: IntermedioResponse[];
  public intermedio: IntermedioResponse;
  public intermedioRequest: IntermedioRequest;

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public valor: boolean;

  constructor(private router: Router,
              private intermedioService: IntermedioService) {
    this.intermedioRequest = new IntermedioRequest();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarIntermedios() {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioRequest.nombre = this.nombre;
    this.intermedioService.listarIntermedios(this.intermedioRequest).subscribe(
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

  agregarIntermedio() {
    this.router.navigate(['almacen/intermedio/intermedio/registro']);
  }

  editarIntermedio(idIntermedio: number) {
    location.href = '#/almacen/intermedio/intermedio/registro?idIntermedio=' + idIntermedio;
  }

}
