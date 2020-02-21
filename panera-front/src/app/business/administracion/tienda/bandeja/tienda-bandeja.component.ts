import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionTiendaService } from '../administracion-tienda.service';
import { TiendaResponse } from '../models/tienda.response';
import { TiendaRequest } from '../models/tienda.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-tienda-bandeja',
    templateUrl: './tienda-bandeja.component.html',
    styleUrls: ['./tienda-bandeja.component.scss'],
    providers: [ AdministracionTiendaService ]
  })

export class TiendaBandejaComponent{

  public tiendasResponse: TiendaResponse;
  public tiendaRequest: TiendaRequest;

  public tiendas: TiendaResponse[];
  public loading: boolean;

  public nombre = '';
  public ruc = '';

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router, private tiendaService: AdministracionTiendaService){
    this.tiendaRequest = new TiendaRequest();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  agregarTienda() {
    this.router.navigate(['administracion/tienda/registro']);
  }

  buscarTienda() {
    PaneraVistaUtils.mostrarLoading(true);
    this.tiendaRequest.nombre = this.nombre;
    this.tiendaRequest.ruc = this.ruc;
    this.tiendaService.listarTiendas(this.tiendaRequest).subscribe(
      data => {
        if (data.success) {
          this.tiendas = data.result;
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

  editarTienda(idTienda: number) {
    location.href = '#/administracion/tienda/registro?idTienda=' + idTienda;
  }

  keyPressRuc(event: KeyboardEvent) {
    const specialKeys = {
      string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
      number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
      decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };
    if (specialKeys['number'].indexOf(event.key) !== -1) {
      return;
    }
    this.ruc = this.ruc == undefined ? '':this.ruc;
    let current: string = this.ruc;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(new RegExp(/^\d+$/))) {
        event.preventDefault();
    }
}

}
