import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { ParametroRequest } from './models/parametro.request';
import { ParametroResponse } from './models/parametro.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class AdministracionParametroService {

    constructor(private http: HttpClient) {
    }

    listarParametros(parametroRequest: ParametroRequest): Observable<PaneraResultResponse<ParametroResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams()
                            .append('nombre', parametroRequest.nombre)
                            .append('idTipo', String(parametroRequest.idTipo));
        return this.http.get<PaneraResultResponse<ParametroResponse[]>>(PaneraConstantes.API_ADMINISTRACION_PARAMETRO,
            { headers, params });
    }

    obtenerParametro(idParametro: number): Observable<PaneraResultResponse<ParametroResponse>> {
        const headers = new HttpHeaders();
        return this.http.get<PaneraResultResponse<ParametroResponse>>(PaneraConstantes.API_ADMINISTRACION_PARAMETRO + '/' + idParametro,
            { headers });
    }

    registrarParametro(parametroRequest: ParametroRequest): Observable<PaneraResultResponse<ParametroResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.post<PaneraResultResponse<ParametroResponse>>(PaneraConstantes.API_ADMINISTRACION_PARAMETRO, parametroRequest,
            { headers });
    }

    actualizarParametro(parametroRequest: ParametroRequest): Observable<PaneraResultResponse<ParametroResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.put<PaneraResultResponse<ParametroResponse>>(PaneraConstantes.API_ADMINISTRACION_PARAMETRO
            + '/' + parametroRequest.id, parametroRequest, { headers });
    }

    eliminarParametro(idParametro: number): Observable<PaneraResultResponse<ParametroResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.delete<PaneraResultResponse<ParametroResponse>>(PaneraConstantes.API_ADMINISTRACION_PARAMETRO + '/' + idParametro,
            { headers });
    }

}
