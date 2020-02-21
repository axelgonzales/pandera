import { Component } from '@angular/core';
import { SeguridadUsuarioService } from '../seguridad-usuario.service';
import { UsuarioResponse } from '../models/usuario.response';
import { UsuarioRequest } from '../models/usuario.request';
import { Router } from '@angular/router';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';

@Component({
    selector: 'app-seguridad-usuario-bandeja',
    templateUrl: './seguridad-usuario-bandeja.component.html',
    styleUrls: ['./seguridad-usuario-bandeja.component.scss'],
    providers: [ SeguridadUsuarioService ]
  })
export class SeguridadUsuarioBandejaComponent{

  public usuario = '';
  public nombre = '';
  public apellido = '';
  public usuarioResponse: UsuarioResponse;
  public usuarioRequest: UsuarioRequest;
  public usuarios: UsuarioResponse[];

  public inBusqueda = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public loading: boolean;

  constructor(private router: Router, private usuarioService: SeguridadUsuarioService){
    this.usuarioRequest = new UsuarioRequest();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  buscarUsuarios() {
    PaneraVistaUtils.mostrarLoading(true);
    this.usuarioRequest.nombre = this.nombre;
    this.usuarioRequest.apellido = this.apellido;
    this.usuarioRequest.usuario = this.usuario;
    this.usuarioService.listarUsuarios(this.usuarioRequest).subscribe(
      data => {
        if (data.success) {
          this.usuarios = data.result;
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

  nuevoUsuario() {
    this.router.navigate(['seguridad/usuario/registro']);
  }

  editarUsuario(idUsuario: number) {
    location.href = '#/seguridad/usuario/registro?idUsuario=' + idUsuario;
  }

}
