import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IntermedioStockService } from '../intermedio-stock-service';
import { IntermedioStockResponse } from '../models/intermedio-stock.response';
import { IntermedioStockRequest } from '../models/intermedio-stock.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-intermedio-stock-bandeja',
    templateUrl: './intermedio-stock-bandeja.component.html',
    styleUrls: ['./intermedio-stock-bandeja.component.scss'],
    providers: [
      IntermedioStockService,
    ]
  })

export class IntermedioStockBandejaComponent {

  public numPedido = '';

  public intermedioStockRequest: IntermedioStockRequest;
  public intermediosStock: IntermedioStockResponse[];

  public currentPage = 1;
  public itemsPerPage = 50;
  public pageSize: number;
  public valor = false;

  constructor(private intermedioStockService: IntermedioStockService) {
    this.listarIntermediosStock();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  listarIntermediosStock() {
    PaneraVistaUtils.mostrarLoading(true);
    this.intermedioStockRequest = new IntermedioStockRequest();
    this.intermedioStockRequest.numPedido = this.numPedido;
    this.intermedioStockService.listarIntermediosStock(this.intermedioStockRequest).subscribe(
      data => {
        if (data.success) {
          this.intermediosStock = data.result;
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
