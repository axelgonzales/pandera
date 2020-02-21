import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionProveedorService } from '../administracion-proveedor.service';
import { ProveedorResponse } from '../models/proveedor.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { ProveedorRequest } from '../models/proveedor.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';


@Component({
    selector: 'app-proveedor-registro',
    templateUrl: './proveedor-registro.component.html',
    styleUrls: ['./proveedor-registro.component.scss'],
    providers: [
      AdministracionProveedorService,
      PaneraUtils,
    ]
  })
export class ProveedorRegistroComponent {

  public proveedor: ProveedorResponse;
  public proveedorRequest: ProveedorRequest;

  constructor(private router: Router,
              private proveedorService: AdministracionProveedorService,
              private paneraUtils: PaneraUtils,
              private modalService: NgbModal) {
    this.cargarProveedor();
  }

  cancelar() {
    this.router.navigate(['administracion/proveedor']);
  }

  cargarProveedor() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idProveedor') !== undefined) {
      const idProveedor = +this.paneraUtils.obtenerGet('idProveedor');
      this.proveedorService.obtenerProveedor(idProveedor).subscribe(
        data => {
          if (data.success) {
            this.proveedor = data.result;
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Proveedor');
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
      this.proveedor = new ProveedorResponse();
      this.proveedor.id = 0;
      this.proveedor.razonSocial = '';
      this.proveedor.ruc = '';
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  guardarProveedor(successModal: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.proveedorRequest = new ProveedorRequest();
      this.proveedorRequest.razonSocial = this.proveedor.razonSocial;
      this.proveedorRequest.ruc = this.proveedor.ruc;
      this.proveedorRequest.direccion = this.proveedor.direccion;
      if (this.proveedor.id > 0) {
        this.actualizarProveedor(successModal);
      } else {
        this.registrarProveedor(successModal);
      }
    }
  }

  registrarProveedor(successModal: any) {
    this.proveedorService.registrarProveedor(this.proveedorRequest).subscribe(
      data => {
        if (data.success) {
          this.proveedor = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_PROVEEDOR_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_PROVEEDOR_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.mostrarLoading(false);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_PROVEEDOR_ERROR);
      }
    );
  }

  actualizarProveedor(successModal: any) {
    this.proveedorRequest.id = this.proveedor.id;
    this.proveedorService.actualizarProveedor(this.proveedorRequest).subscribe(
      data => {
        if (data.success) {
          this.proveedor = data.result;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_PROVEEDOR_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_PROVEEDOR_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        this.modalService.open(successModal);
        PaneraVistaUtils.mostrarLoading(false);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_PROVEEDOR_ERROR);
      }
    );
  }

  validarCampos(): boolean {
    let cont = 0;
    if (this.proveedor.razonSocial === '') {
      PaneraVistaUtils.invalid('razonSocial');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('razonSocial');
    }
    if (this.proveedor.ruc === '') {
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
      const regex = {
        string: new RegExp(/^[a-zA-Z]/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    } ;
    this.proveedor.ruc = this.proveedor.ruc == undefined ? '':this.proveedor.ruc;
      let current: string = this.proveedor.ruc;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(regex['number'])) {
          event.preventDefault();
      }
  }

}
