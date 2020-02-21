import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionFamiliaService } from '../administracion-familia.service';
import { FamiliaResponse } from '../models/familia.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { FamiliaRequest } from '../models/familia.request';
import {NgbModalConfig,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-familia-registro',
    templateUrl: './familia-registro.component.html',
    styleUrls: ['./familia-registro.component.scss'],
    providers: [ AdministracionFamiliaService,PaneraUtils ]
  })
export class FamiliaRegistroComponent{
  closeResult: string;

  public familia: FamiliaResponse;
  public familiaRequest: FamiliaRequest;
  public loading: boolean;
  public verBotones: boolean;


  constructor(private router: Router, private familiaService: AdministracionFamiliaService, private paneraUtils: PaneraUtils,private modalService: NgbModal){
    this.cargarFamilia();
    this.familiaRequest = new FamiliaRequest();
  }
  
  cancelar(){
    this.router.navigate(['administracion/familia']);
  }
  cargarFamilia() {
    this.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idFamilia') !== undefined) {
      const idFamilia = +this.paneraUtils.obtenerGet('idFamilia');
      this.loading = true;
      this.familiaService.obtenerFamilia(idFamilia).subscribe(
        data => {
          if (data.success) {
            this.familia = data.result;
          } else {
            console.log(data.message);
          }
          this.mostrarLoading(false);
        },
        err => {
          console.log(err);
          this.mostrarLoading(false);
        }
      );
    } else {
      this.familia = new FamiliaResponse();
      this.mostrarLoading(false);
    }
  }

  guardarFamilia(content1,content2){
    this.mostrarLoading(true);
    this.familiaRequest.nombre = this.familia.nombre;
    this.familiaRequest.descripcion = this.familia.descripcion;
    if(this.familia.nombre !== undefined ){
    if (this.familia.id === undefined) {
      this.familiaService.registrarFamilia(this.familiaRequest).subscribe(
        data => {
          if (data.success) {
            this.familia = data.result;
            this.modalService.open(content1);
            //this.perfiles = this.usuario.perfiles;
          } else {
            console.log(data.message);
            this.modalService.open(content2);
          }
          this.mostrarLoading(false);
        },
        err => {
          console.log(err);
          this.mostrarLoading(false);
          this.modalService.open(content2);
        }
      );
    } else {
      this.familiaRequest.id = this.familia.id;
      this.familiaService.actualizarFamilia(this.familiaRequest).subscribe(
        data => {
          if (data.success) {
            this.familia = data.result;
            this.modalService.open(content1);
            //this.perfiles = this.usuario.perfiles;
          } else {
            console.log(data.message);
            this.modalService.open(content2);
          }
          this.mostrarLoading(false);
        },
        err => {
          console.log(err);
          this.mostrarLoading(false);
          this.modalService.open(content2);
        }
      );
    }
  }
  else{
    this.mostrarLoading(false);
    if(this.familia.nombre === undefined){
      var nombre = document.getElementById('nombre');
      nombre.style.borderColor= "red";
      nombre.style.boxShadow = "0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgba(255,144,0,0.6)";
      nombre.style.outline= "0 none";
    }
  }
}

  mostrarLoading(estado: boolean){
    var val = (estado == true) ? "block":"none";
    var load = document.getElementById('loaderOverlay');
    load.style.display = val;
    this.verBotones = !estado;
  }
  limpiar(){
    var nombre = document.getElementById('nombre');
      nombre.style.borderColor= "";
      nombre.style.boxShadow = "";
      nombre.style.outline= "";
  }
}