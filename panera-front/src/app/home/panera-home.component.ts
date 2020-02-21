import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from './panera-home.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { LoginResponse } from '../login/model/panera-login.response';
import { PermisoPadreResponse } from '../login/model/panera-permiso-padre.response';
import { getLocaleDateTimeFormat, Time } from '@angular/common';

@Component({
  selector: 'app-panera-home',
  templateUrl: './panera-home.component.html',
  providers: [HomeService],
  styleUrls: ['./panera-home.component.scss', './panera-home.form.scss']
})
export class HomeComponent {
  public isCollapsed: boolean;
  public usuario: LoginResponse;
  public title: string;
  public title2: string;
  public hoy: Date;
  public fecha: string;
  public hora: string;
  public fechaYHora: string;
  public permisos: PermisoPadreResponse[];

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {
    this.isCollapsed = false;
    this.hoy = new Date();
    this.fecha =
      (this.hoy.getDate() < 10
        ? '0' + this.hoy.getDate()
        : this.hoy.getDate()) +
      '-' +
      (this.hoy.getMonth() + 1 < 10
        ? '0' + (this.hoy.getMonth() + 1)
        : this.hoy.getMonth() + 1) +
      '-' +
      this.hoy.getFullYear();
    this.hora =
      this.hoy.getHours() +
      ':' +
      this.hoy.getMinutes() +
      ':' +
      this.hoy.getSeconds();
    this.fechaYHora = this.fecha;
    setInterval(this.reloj, 1000);
    if (this.storage.get('usuario-panera') != null) {
      console.log(this.storage.get('usuario-panera'));

      this.usuario = this.storage.get('usuario-panera');
      if (this.usuario.idTienda === 0) {
        this.title = this.usuario.usuario + ' - Gerente de Producción';
        this.title2 = this.usuario.usuario + ' - Gerente de Producción';
      } else {
        this.title = this.usuario.usuario + ' - ' + this.usuario.nomTienda;
        this.title2 = this.usuario.usuario + ' - ' + this.usuario.nomTienda;
      }

      this.permisos = this.usuario.permisos;
    } else {
      this.usuario = new LoginResponse();
      this.router.navigate(['login']);
    }
  }

  reloj() {
    this.hoy = new Date();
    this.fecha =
      this.hoy.getDate() < 10
        ? '0' + this.hoy.getDate()
        : this.hoy.getDate() + '-' + (this.hoy.getMonth() + 1 < 10)
        ? '0' + (this.hoy.getMonth() + 1)
        : this.hoy.getMonth() + 1 + '-' + this.hoy.getFullYear();
    this.hora =
      this.hoy.getHours() +
      ':' +
      this.hoy.getMinutes() +
      ':' +
      this.hoy.getSeconds();
    this.fechaYHora = this.fecha + '  ' + this.hora;
  }

  cerrarSesion() {
    this.storage.remove('usuario-panera');
    this.router.navigate(['login']);
  }

  prueb() {
    let content = document.getElementById('wrap-content');
    content.style.left = this.isCollapsed ? '0px' : '270px';

    let val = document.getElementById('demo');
    val.style.display = this.isCollapsed ? 'none' : 'inline-block';

    var dropdown = document.getElementsByClassName('dropdown-btn');
    var i;
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
        }
      });
    }
  }

  prueb2() {
    let content = document.getElementById('wrap-content');
    content.style.left = this.isCollapsed ? '0px' : '270px';

    let val = document.getElementById('demo');
    val.style.display = this.isCollapsed ? 'none' : 'inline-block';
    this.isCollapsed = !this.isCollapsed;

    var dropdown = document.getElementsByClassName('dropdown-btn');
    var i;
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
        }
      });
    }
  }
}
