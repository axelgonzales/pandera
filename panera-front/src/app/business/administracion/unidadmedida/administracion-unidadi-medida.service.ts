import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { UnidadMedidaResponse } from './models/unidad-medida.response';
import { UnidadMedidaRequest } from './models/unidad-medida.request';
import { Observable } from 'rxjs';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class AdministracionUnidadMedidaService {

    constructor(private http: HttpClient){

    }

    listarUnidadMedidas(unidadMedidaRequest: UnidadMedidaRequest): Observable<PaneraResultResponse<UnidadMedidaResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams().append('nombre', unidadMedidaRequest.nombre);
        return this.http.get<PaneraResultResponse<UnidadMedidaResponse[]>>(PaneraConstantes.API_ADMINISTRACION_UNIDAD_MEDIDA,
            { params, headers });
    }

}
