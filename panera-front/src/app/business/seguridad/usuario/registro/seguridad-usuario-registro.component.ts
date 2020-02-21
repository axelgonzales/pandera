import { Component } from '@angular/core';
import { SeguridadUsuarioService } from '../seguridad-usuario.service';
import { UsuarioResponse } from '../models/usuario.response';
import { Router } from '@angular/router';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { UsuarioRequest } from '../models/usuario.request';
import { UsuarioPerfilResponse } from '../models/usuario-perfil.response';
import { SeguridadPerfilService } from '../../perfil/seguridad-perfil.service';
import { PerfilRequest } from '../../perfil/models/perfil.request';
import { AdministracionTiendaService } from 'src/app/business/administracion/tienda/administracion-tienda.service';
import { TiendaResponse } from 'src/app/business/administracion/tienda/models/tienda.response';
import { TiendaRequest } from 'src/app/business/administracion/tienda/models/tienda.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-seguridad-usuario-registro',
    templateUrl: './seguridad-usuario-registro.component.html',
    styleUrls: ['./seguridad-usuario-registro.component.scss'],
    providers: [
      SeguridadUsuarioService,
      SeguridadPerfilService,
      AdministracionTiendaService,
      PaneraUtils,
      NgbModal,
    ]
  })
export class SeguridadUsuarioRegistroComponent {

  public usuario: UsuarioResponse;
  public perfiles: UsuarioPerfilResponse[];
  public contrasena = '';
  public usuarioRequest: UsuarioRequest;
  public tiendas: TiendaResponse[];

  public inputLectura: boolean;

  constructor(private router: Router,
              private modalService: NgbModal,
              private usuarioService: SeguridadUsuarioService,
              private perfilService: SeguridadPerfilService,
              private tiendaService: AdministracionTiendaService,
              private paneraUtils: PaneraUtils) {
    this.inputLectura = false;
    this.cargarUsuario();
    this.usuarioRequest = new UsuarioRequest();
  }

  cargarUsuario() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idUsuario') !== undefined) {
      const idUsuario = +this.paneraUtils.obtenerGet('idUsuario');
      this.usuarioService.obtenerUsuario(idUsuario).subscribe(
        data => {
          if (data.success) {
            this.usuario = data.result;
            this.perfiles = this.usuario.perfiles;
            this.inputLectura = true;
            this.listarPerfiles();
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Usuario');
          } else {
            console.log(data.message);
            PaneraVistaUtils.mostrarLoading(false);
          }
        },
        err => {
          console.log(err);
          PaneraVistaUtils.mostrarLoading(false);
        }
      );
    } else {
      this.usuario = new UsuarioResponse();
      this.usuario.id = 0;
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.usuario = '';
      this.perfiles = this.listarPerfiles();
      this.usuario.perfiles = this.perfiles;
    }
  }

  listarPerfiles(): UsuarioPerfilResponse[] {
    const auxPerfilesResponse: Array<UsuarioPerfilResponse> = [];
    const perfilRequest = new PerfilRequest();
    this.perfilService.listarPerfiles(perfilRequest).subscribe(
      data => {
        if (data.success) {
          data.result.forEach(auxPerfil => {
            const usuarioPerfil = new UsuarioPerfilResponse();
            usuarioPerfil.id = 0;
            usuarioPerfil.idPerfil = auxPerfil.id;
            usuarioPerfil.nomPerfil = auxPerfil.nombre;
            usuarioPerfil.activo = '0';
            auxPerfilesResponse.push(usuarioPerfil);
            this.listarTiendas();
          });
        } else {
          PaneraVistaUtils.mostrarLoading(false);
        }
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
    return auxPerfilesResponse;
  }

  listarTiendas() {
    const tiendaRequest = new TiendaRequest();
    this.tiendaService.listarTiendas(tiendaRequest).subscribe(
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

  seleccionoPerfil(i: number) {
    if (this.usuario.perfiles[i].activo === '1') {
      this.usuario.perfiles[i].activo = '0';
    } else {
      this.usuario.perfiles[i].activo = '1';
    }
  }

  guardarUsuario(successModal: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.usuarioRequest.nombre = this.usuario.nombre;
      this.usuarioRequest.apellido = this.usuario.apellido;
      this.usuarioRequest.usuario = this.usuario.usuario;
      this.usuarioRequest.contrasena = this.contrasena;
      this.usuarioRequest.perfiles = this.usuario.perfiles;
      this.usuarioRequest.idTienda = this.usuario.idTienda;
      if (this.usuario.id > 0) {
        this.actualizarUsuario(successModal);
      } else {
        this.registrarUsuario(successModal);
      }
    }
  }

  registrarUsuario(successModal: any) {
    this.usuarioService.registrarUsuario(this.usuarioRequest).subscribe(
      data => {
        if (data.success) {
          this.usuario = data.result;
          this.perfiles = this.usuario.perfiles;
          this.inputLectura = true;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_USUARIO_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_USUARIO_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_USUARIO_ERROR);
      }
    );
  }

  actualizarUsuario(successModal: any) {
    this.usuarioRequest.id = this.usuario.id;
    this.usuarioService.actualizarUsuario(this.usuarioRequest).subscribe(
      data => {
        if (data.success) {
          this.usuario = data.result;
          this.perfiles = this.usuario.perfiles;
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_USUARIO_OK);
        } else {
          console.log(data.message);
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_USUARIO_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_USUARIO_ERROR);
      }
    );
  }

  validarCampos(): boolean {
    let cont = 0;
    if (this.usuario.usuario === '') {
      PaneraVistaUtils.invalid('usuario');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('usuario');
    }
    if (this.usuario.nombre === '') {
      PaneraVistaUtils.invalid('nombre');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('nombre');
    }
    if (this.usuario.apellido === '') {
      PaneraVistaUtils.invalid('apellido');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('apellido');
    }
    if (this.usuario.id === 0) {
      if (this.contrasena === '') {
        PaneraVistaUtils.invalid('contrasena');
        cont = cont + 1;
      } else {
        PaneraVistaUtils.valid('contrasena');
      }
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

  cancelar() {
    this.router.navigate(['seguridad/usuario']);
  }

}
