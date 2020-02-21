import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionSubFamiliaService } from '../administracion-subfamilia.service';
import { SubFamiliaResponse } from '../models/subfamilia.response';
import { SubFamiliaRequest } from '../models/subfamilia.request';

@Component({
    selector: 'app-subfamilia-bandeja',
    templateUrl: './subfamilia-bandeja.component.html',
    styleUrls: ['./subfamilia-bandeja.component.scss'],
    providers: [ AdministracionSubFamiliaService ]
  })

export class SubFamiliaBandejaComponent{

  public subfamiliasResponse: SubFamiliaResponse;
  public subfamiliaRequest: SubFamiliaRequest;

  public subfamilias: SubFamiliaResponse[];
  public loading: boolean;
  public verBotones: boolean;
  public nombre : string;
  public descripcion : string;
  currentPage = 1;
  itemsPerPage = 10;
  pageSize: number;
  public valor: boolean;

  constructor(private router: Router, private subfamiliaService: AdministracionSubFamiliaService){
    this.subfamiliaRequest = new SubFamiliaRequest();
    this.nombre = "";
    this.verBotones = true;
    this.valor = false;
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  agregarSubFamilia(){
    this.router.navigate(['administracion/subfamilia/registro']);
  }

  buscarSubFamilia(){
    this.mostrarLoading(true);
    this.subfamiliaRequest.nombre = this.nombre;
    this.subfamiliaService.listarSubFamilias(this.subfamiliaRequest).subscribe(
      data => {
        if (data.success) {
          this.subfamilias = data.result;
          this.valor = true;
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
  }

  editarSubFamilia(idSubFamilia: number) {
    location.href = '#/administracion/subfamilia/registro?idSubFamilia=' + idSubFamilia;
  }

  mostrarLoading(estado: boolean){
    var val = (estado == true) ? "block":"none";
    var load = document.getElementById('loaderOverlay');
    load.style.display = val;
    this.verBotones = !estado;
  }
}