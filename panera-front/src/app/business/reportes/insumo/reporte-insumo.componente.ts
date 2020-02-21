import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaneraReportesService } from '../panera-reportes.service';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Component({
    selector: 'app-reporte-insumo',
    templateUrl: './reporte-insumo.component.html',
    styleUrls: ['./reporte-insumo.component.scss'],
    providers: [ PaneraReportesService ]
})

export class ReporteInsumoComponent{

    constructor(private router: Router, private reporteService : PaneraReportesService){

    }

    generarReporteInsumo() {
        location.href = PaneraConstantes.API_REPORTE_INSUMO;
    }
    
}