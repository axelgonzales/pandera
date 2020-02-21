import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionSubFamiliaService } from '../administracion-subfamilia.service';
import { SubFamiliaResponse } from '../models/subfamilia.response';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { SubFamiliaRequest } from '../models/subfamilia.request';
import {NgbModalConfig,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-subfamilia-registro',
    templateUrl: './subfamilia-registro.component.html',
    styleUrls: ['./subfamilia-registro.component.scss'],
    providers: [ AdministracionSubFamiliaService,PaneraUtils ]
  })
export class SubFamiliaRegistroComponent{

  closeResult: string;

  public subfamilia: SubFamiliaResponse;
  public subfamiliaRequest: SubFamiliaRequest;
  public loading: boolean;
  public verBotones: boolean;


  constructor(private router: Router, private subfamiliaService: AdministracionSubFamiliaService, private paneraUtils: PaneraUtils,
    private modalService: NgbModal){
    this.cargarSubFamilia();
    this.subfamiliaRequest = new SubFamiliaRequest();
  }
  
  cancelar(){
    this.router.navigate(['administracion/subfamilia']);
  }
  cargarSubFamilia() {
    this.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idSubFamilia') !== undefined) {
      const idSubFamilia = +this.paneraUtils.obtenerGet('idSubFamilia');
      this.loading = true;
      this.subfamiliaService.obtenerSubFamilia(idSubFamilia).subscribe(
        data => {
          if (data.success) {
            this.subfamilia = data.result;
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
      this.subfamilia = new SubFamiliaResponse();
      this.mostrarLoading(false);
    }
  }
  guardarSubFamilia(content1,content2){
    this.mostrarLoading(true);
    this.subfamiliaRequest.nombre = this.subfamilia.nombre;
    this.subfamiliaRequest.descripcion = this.subfamilia.descripcion;
    if(this.subfamilia.nombre !== undefined ){
    if (this.subfamilia.id === undefined) {
      this.subfamiliaService.registrarSubFamilia(this.subfamiliaRequest).subscribe(
        data => {
          if (data.success) {
            this.subfamilia = data.result;
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
      this.subfamiliaRequest.id = this.subfamilia.id;
      this.subfamiliaService.actualizarSubFamilia(this.subfamiliaRequest).subscribe(
        data => {
          if (data.success) {
            this.subfamilia = data.result;
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
    if(this.subfamilia.nombre === undefined){
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