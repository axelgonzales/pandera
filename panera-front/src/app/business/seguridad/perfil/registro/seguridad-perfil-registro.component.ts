import { Component } from '@angular/core';
import { SeguridadPerfilService } from '../seguridad-perfil.service';
import { PerfilResponse } from '../models/perfil.response';
import { PerfilRequest } from '../models/perfil.request';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { Router } from '@angular/router';
import { PerfilPermisoResponse } from '../models/perfil-permiso.response';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisoRequest } from '../../permiso/models/permiso.request';
import { SeguridadPermisoService } from '../../permiso/seguridad-permiso.service';
import { PerfilPermisoRequest } from '../models/perfil-permiso.request';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PaneraMensaje } from 'src/app/commons/util/panera-mensaje';

@Component({
    selector: 'app-seguridad-perfil-registro',
    templateUrl: './seguridad-perfil-registro.component.html',
    styleUrls: ['./seguridad-perfil-registro.component.scss'],
    providers: [
      SeguridadPerfilService,
      SeguridadPermisoService,
      PaneraUtils,
    ]
  })
export class SeguridadPerfilRegistroComponent {

  public perfil = new PerfilResponse();
  public permisos: PerfilPermisoResponse[];
  public perfilRequest: PerfilRequest;

  public inputLectura: boolean;

  constructor(private router: Router,
              private modalService: NgbModal,
              private perfilService: SeguridadPerfilService,
              private permisoService: SeguridadPermisoService,
              private paneraUtils: PaneraUtils) {
    this.inputLectura = false;
    this.cargarPerfil();
  }

  cargarPerfil() {
    if (this.paneraUtils.obtenerGet('idPerfil') !== undefined) {
      PaneraVistaUtils.mostrarLoading(true);
      const idPerfil = +this.paneraUtils.obtenerGet('idPerfil');
      this.perfilService.obtenerPerfil(idPerfil).subscribe(
        data => {
          if (data.success) {
            this.perfil = data.result;
            this.permisos = this.perfil.permisos;
            this.inputLectura = true;
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Perfil');
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
      this.listarPermisos();
      this.perfil = new PerfilResponse();
      this.perfil.id = 0;
      this.perfil.nombre = '';
      this.perfil.permisos = [];
      PaneraVistaUtils.mostrarLoading(false);
    }
  }

  listarPermisos() {
    PaneraVistaUtils.mostrarLoading(true);
    const permisoRequest = new PermisoRequest();
    this.permisoService.listarPermisos(permisoRequest).subscribe(
      data => {
        if (data.success) {
          const auxPermisos = [];
          data.result.forEach(item => {
            const perfilPermiso = new PerfilPermisoResponse();
            perfilPermiso.id = 0;
            perfilPermiso.idPadre = item.idPadre;
            perfilPermiso.idPermiso = item.id;
            perfilPermiso.nomPermiso = item.nombre;
            perfilPermiso.url = item.url;
            perfilPermiso.inPadre = item.inPadre;
            perfilPermiso.activo = PaneraConstantes.IN_INACTIVO;
            auxPermisos.push(perfilPermiso);
          });
          this.permisos = auxPermisos;
        } else {
          console.log(data.message);
        }
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  seleccionoPermiso(i: number) {
    if (this.permisos[i].activo === '1') {
      this.permisos[i].activo = '0';
    } else {
      this.permisos[i].activo = '1';
    }
    this.verificarPermisoPadre(i);
  }

  verificarPermisoPadre(i: number) {
    const idPadre = this.permisos[i].idPadre;
    let activo = '0';
    this.permisos.forEach(permiso => {
      if (String(permiso.idPermiso) !== String(idPadre) && String(permiso.idPadre) === String(idPadre) && permiso.activo === '1') {
        activo = '1';
      }
    });
    this.permisos.forEach(permiso => {
      if (String(permiso.idPermiso) === String(idPadre)) {
        permiso.activo = activo;
      }
    });
  }

  guardarPerfil(successModal: any) {
    if (this.validarCampos()) {
      PaneraVistaUtils.mostrarLoading(true);
      this.perfilRequest = new PerfilRequest();
      this.perfilRequest.nombre = this.perfil.nombre;
      this.perfilRequest.descripcion = this.perfil.descripcion;
      this.perfilRequest.permisos = this.obtenerPermisosPerfil();
      if (this.perfil.id > 0) {
        this.actualizarPerfil(successModal);
      } else {
        this.registrarPerfil(successModal);
      }
    }
  }

  registrarPerfil(successModal: any) {
    this.perfilService.registrarPerfil(this.perfilRequest).subscribe(
      data => {
        if (data.success) {
          this.perfil = data.result;
          this.permisos = this.perfil.permisos;
          PaneraVistaUtils.cambiarBtnGuardar('Actualizar Perfil');
          this.modalService.open(successModal);
          PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_REGISTRO_PERFIL_OK);
        } else {
          this.modalService.open(successModal);
          PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_PERFIL_ERROR);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_REGISTRO_PERFIL_ERROR);
      }
    );
  }

  actualizarPerfil(successModal: any) {
    this.perfilRequest.id = this.perfil.id;
    this.perfilService.actualizarPerfil(this.perfilRequest).subscribe(
      data => {
          if (data.success) {
            this.perfil = data.result;
            this.permisos = this.perfil.permisos;
            this.modalService.open(successModal);
            PaneraVistaUtils.showSuccess(PaneraMensaje.MENSAJE_ACTUALIZACION_PERFIL_OK);
          } else {
            this.modalService.open(successModal);
            PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_PERFIL_ERROR);
          }
          PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
        this.modalService.open(successModal);
        PaneraVistaUtils.showError(PaneraMensaje.MENSAJE_ACTUALIZACION_PERFIL_ERROR);
      }
    );
  }

  validarCampos(): boolean {
    let cont = 0;
    if (this.perfil.nombre === '') {
      PaneraVistaUtils.invalid('nombre');
      cont = cont + 1;
    } else {
      PaneraVistaUtils.valid('nombre');
    }

    if (cont > 0) {
      return false;
    } else {
      return true;
    }
  }

  limpiarCampos() {

  }

  obtenerPermisosPerfil(): PerfilPermisoRequest[] {
    const auxPerfilPermiso = [];
    this.permisos.forEach(perfilPermiso => {
      const perfilPermisoRequest = new PerfilPermisoRequest();
      perfilPermisoRequest.id = perfilPermiso.id;
      perfilPermisoRequest.idPermiso = perfilPermiso.idPermiso;
      perfilPermisoRequest.nomPermiso = perfilPermiso.nomPermiso;
      perfilPermisoRequest.url = perfilPermiso.url;
      perfilPermisoRequest.inPadre  = perfilPermiso.inPadre;
      perfilPermisoRequest.activo = perfilPermiso.activo;
      auxPerfilPermiso.push(perfilPermisoRequest);
    });

    return auxPerfilPermiso;
  }

  cancelar() {
    this.router.navigate(['seguridad/perfil']);
  }

}
