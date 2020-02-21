import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PedidosDevolucionService } from '../pedidos-devolucion.service';
import { DevolucionResponse } from '../models/devolucion.response';

@Component({
    selector: 'app-devolucion-registro',
    templateUrl: './devolucion-registro.component.html',
    styleUrls: ['./devolucion-registro.component.scss'],
    providers: [
      PedidosDevolucionService,
    ]
  })
export class DevolucionRegistroComponent {
  closeResult: string;

  public devolucion: DevolucionResponse;

  public fechaDevolucion = '';

  public verEdicion = false;
  public verBtnAgregar = false;

  constructor(private router: Router,
              private modalService: NgbModal) {

  }

  agregarProducto(modalProducto: any) {

  }

  open(contentModal) {
    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  cancelar() {
    this.router.navigate(['pedidos/devolucion']);
  }

}
