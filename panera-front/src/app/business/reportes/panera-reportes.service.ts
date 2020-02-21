import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class PaneraReportesService{

    constructor(private http: HttpClient){

    }

    reporteInsumos(){
        const headers = new HttpHeaders();
        /*const params = new HttpParams().append('estado', perfilRequest.estado)
                                       .append('nombre', perfilRequest.nombre === undefined ? '' : perfilRequest.nombre);*/
        this.http.get(PaneraConstantes.API_REPORTE_INSUMO,
            { headers : headers });
    }

}