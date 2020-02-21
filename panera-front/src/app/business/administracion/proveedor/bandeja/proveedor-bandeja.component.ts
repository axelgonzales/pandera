import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionProveedorService } from '../administracion-proveedor.service';
import { ProveedorResponse } from '../models/proveedor.response';
import { ProveedorRequest } from '../models/proveedor.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-proveedor-bandeja',
    templateUrl: './proveedor-bandeja.component.html',
    styleUrls: ['./proveedor-bandeja.component.scss'],
    providers: [ AdministracionProveedorService ]
  })

export class ProveedorBandejaComponent {

  public ruc = '';
  public razonSocial = '';

  public proveedorRequest: ProveedorRequest;
  public proveedores: ProveedorResponse[];

  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;

  constructor(private router: Router, private proveedorService: AdministracionProveedorService) {
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  buscarProveedores() {
    PaneraVistaUtils.mostrarLoading(true);
    this.proveedorRequest = new ProveedorRequest();
    this.proveedorRequest.ruc = this.ruc;
    this.proveedorRequest.razonSocial = this.razonSocial;
    this.proveedorService.listarProveedores(this.proveedorRequest).subscribe(
      data => {
        if (data.success) {
          this.proveedores = data.result;
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

  agregarProveedor() {
    this.router.navigate(['administracion/proveedor/registro']);
  }

  editarProveedor(idProveedor: number) {
    location.href = '#/administracion/proveedor/registro?idProveedor=' + idProveedor;
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
    this.ruc = this.ruc == undefined ? '':this.ruc;
    let current: string = this.ruc;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex['number'])) {
        event.preventDefault();
    }
}

}
