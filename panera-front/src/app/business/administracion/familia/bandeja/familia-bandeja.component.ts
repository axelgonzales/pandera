import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionFamiliaService } from '../administracion-familia.service';
import { FamiliaResponse } from '../models/familia.response';
import { FamiliaRequest } from '../models/familia.request';

@Component({
    selector: 'app-familia-bandeja',
    templateUrl: './familia-bandeja.component.html',
    styleUrls: ['./familia-bandeja.component.scss'],
    providers: [ AdministracionFamiliaService ]
  })

export class FamiliaBandejaComponent {

  public familiasResponse: FamiliaResponse;
  public familiaRequest: FamiliaRequest;

  public familias: FamiliaResponse[];
  public loading: boolean;
  public verBotones: boolean;
  public nombre = '';
  public descripcion: string;
  public currentPage = 1;
  public itemsPerPage = 10;
  public pageSize: number;
  public valor = false;

  constructor(private router: Router, private familiaService: AdministracionFamiliaService) {
    this.familiaRequest = new FamiliaRequest();
    this.verBotones = true;
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  agregarFamilia() {
    this.router.navigate(['administracion/familia/registro']);
  }

  buscarFamilia(){
    this.mostrarLoading(true);
    this.familiaRequest.nombre = this.nombre;
    this.familiaService.listarFamilias(this.familiaRequest).subscribe(
      data => {
        if (data.success) {
          this.familias = data.result;
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

  editarFamilia(idFamilia: number) {
    location.href = '#/administracion/familia/registro?idFamilia=' + idFamilia;
  }

  mostrarLoading(estado: boolean){
    var val = (estado == true) ? "block":"none";
    var load = document.getElementById('loaderOverlay');
    load.style.display = val;
    this.verBotones = !estado;
  }

}