import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoRequest } from './models/estado.request';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { EstadoResponse } from './models/estado.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class AdministracionEstadoService {

    constructor(private http: HttpClient) {
    }

    listarEstados(estadoRequest: EstadoRequest): Observable<PaneraResultResponse<EstadoResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams().append('idTipo', String(estadoRequest.idTipo));
        return this.http.get<PaneraResultResponse<EstadoResponse[]>>(PaneraConstantes.API_ADMINISTRACION_ESTADO,
            { headers, params });
    }

}
