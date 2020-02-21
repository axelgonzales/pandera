import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionTiendaService } from '../administracion-tienda.service';
import { TiendaResponse } from '../models/tienda.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { TiendaRequest } from '../models/tienda.request';
import {NgbModalConfig,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';


@Component({
    selector: 'app-tienda-registro',
    templateUrl: './tienda-registro.component.html',
    styleUrls: ['./tienda-registro.component.scss'],
    providers: [
      AdministracionTiendaService,
      PaneraUtils,
    ]
  })
export class TiendaRegistroComponent {

  public tienda: TiendaResponse;
  public tiendaRequest: TiendaRequest;

  constructor(private router: Router,
              private tiendaService: AdministracionTiendaService,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal,
              private el: ElementRef) {
    this.cargarTienda();
  }
  cancelar() {
    this.router.navigate(['administracion/tienda']);
  }

  cargarTienda() {
    if (this.paneraUtils.obtenerGet('idTienda') !== undefined) {
      const idTienda = +this.paneraUtils.obtenerGet('idTienda');
      this.tiendaService.obtenerTienda(idTienda).subscribe(
        data => {
          if (data.success) {
            this.tienda = data.result;
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Tienda');
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
    } else {
      this.tienda = new TiendaResponse();
      this.tienda.id = 0;
      this.tienda.nombre = '';
      this.tienda.ruc = '';
      this.tienda.direccion = '';
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  guardarTienda(succesModal: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.tiendaRequest = new TiendaRequest();
      this.tiendaRequest.nombre = this.tienda.nombre;
      this.tiendaRequest.ruc = this.tienda.ruc;
      this.tiendaRequest.direccion = this.tienda.direccion;
      if (this.tienda.id > 0) {
        this.actualizarTienda(succesModal);
      } else {
        this.registrarTienda(succesModal);
      }
    }
  }

  registrarTienda(succesModal: any) {
    this.tiendaService.registrarTienda(this.tiendaRequest).subscribe(
      data => {
        if (data.success) {
          this.tienda = data.result;
          this.modalService.open(succesModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_TIENDA_OK);
        } else {
          console.log(data.message);
          this.modalService.open(succesModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_TIENDA_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(succesModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_TIENDA_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  actualizarTienda(succesModal: any) {
    this.tiendaRequest.id = this.tienda.id;
    this.tiendaService.actualizarTienda(this.tiendaRequest).subscribe(
      data => {
        if (data.success) {
          this.tienda = data.result;
          this.modalService.open(succesModal);
          PaneraVistaUtils.cambiarBtnGuardar('Actualizar Tienda');
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_TIENDA_OK);
        } else {
          console.log(data.message);
          this.modalService.open(succesModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_TIENDA_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(succesModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_TIENDA_ERROR);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  validarCampos(): boolean {
    let cont = 0;
    if (this.tienda.nombre === '') {
      PaneraVistaUtils.invalid('nombre');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('nombre');
    }
    if (this.tienda.ruc === '') {
      PaneraVistaUtils.invalid('ruc');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('ruc');
    }

    if (cont > 0) {
      return false;
    } else {
      return true;
    }
  }

  limpiarCampos() {
    this.validarCampos();    
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
    this.tienda.ruc = this.tienda.ruc == undefined ? '':this.tienda.ruc;

      const regex = {
        string: new RegExp(/^[a-zA-Z]/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[1-9][0-9]*([.][0-9]{2}|)$/)
    } ;

 

    let current: string = this.tienda.ruc;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex['number'])) {
        event.preventDefault();
    }
  }

  keyPressDireccion(event: KeyboardEvent) {

    const regex = {
      string: new RegExp(/^[a-zA-Z]/),
      number: new RegExp(/^\d+$/),
      decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    };

    const specialKeys = {
        string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };

    if (specialKeys['string'].indexOf(event.key) !== -1) {
        return;
    }
    this.tienda.direccion = this.tienda.direccion == undefined ? '':this.tienda.direccion;
    let current: string = this.tienda.direccion;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex['string'])) {
        event.preventDefault();
    }
  }
    
}
