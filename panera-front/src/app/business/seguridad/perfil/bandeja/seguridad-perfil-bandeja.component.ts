import { Component } from '@angular/core';
import { SeguridadPerfilService } from '../seguridad-perfil.service';
import { Router } from '@angular/router';
import { PerfilResponse } from '../models/perfil.response';
import { PerfilRequest } from '../models/perfil.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-seguridad-perfil-bandeja',
    templateUrl: './seguridad-perfil-bandeja.component.html',
    styleUrls: ['./seguridad-perfil-bandeja.component.scss'],
    providers: [ SeguridadPerfilService ]
  })
export class SeguridadPerfilBandejaComponent {

  public nombre = '';
  public perfiles: PerfilResponse[];
  public perfilRequest: PerfilRequest;
  public perfil: PerfilResponse;

  public verBotones: boolean;

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public loading: boolean;

  constructor(private router: Router, private perfilService: SeguridadPerfilService) {
    this.loading = false;
    this.verBotones = true;
    this.perfilRequest = new PerfilRequest();
    this.nombre = '';
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  buscarPerfiles() {
    PaneraVistaUtils.mostrarLoading(true);
    this.perfilRequest.nombre = this.nombre;
    this.perfilService.listarPerfiles(this.perfilRequest).subscribe(
      data => {
        if (data.success) {
          this.perfiles = data.result;
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

  nuevoPerfil() {
    this.router.navigate(['seguridad/perfil/registro']);
  }

  editarPerfil(idPerfil: number) {
    location.href = '#/seguridad/perfil/registro?idPerfil=' + idPerfil;
  }

  mostrarLoading(estado: boolean) {
    this.loading = estado;
    this.verBotones = !estado;
  }

}
