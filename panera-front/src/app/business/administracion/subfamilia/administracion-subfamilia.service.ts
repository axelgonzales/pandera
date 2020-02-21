import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { Observable } from 'rxjs';
import { SubFamiliaRequest } from './models/subfamilia.request';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { SubFamiliaResponse } from './models/subfamilia.response';

@Injectable()
export class AdministracionSubFamiliaService {

    constructor(private http: HttpClient) {
    }

    listarSubFamilias(subfamiliaRequest: SubFamiliaRequest): Observable<PaneraResultResponse<SubFamiliaResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams().append('nombre', subfamiliaRequest.nombre);
        return this.http.get<PaneraResultResponse<SubFamiliaResponse[]>>(PaneraConstantes.API_ADMINISTRACION_SUB_FAMILIA,
            { headers, params });
    }

    obtenerSubFamilia(idSubFamilia: number): Observable<PaneraResultResponse<SubFamiliaResponse>> {
        const headers = new HttpHeaders();
        return this.http.get<PaneraResultResponse<SubFamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_SUB_FAMILIA + '/' + idSubFamilia,
            { headers });
    }

    registrarSubFamilia(subfamiliaRequest: SubFamiliaRequest): Observable<PaneraResultResponse<SubFamiliaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.post<PaneraResultResponse<SubFamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_SUB_FAMILIA, subfamiliaRequest,
            { headers });
    }

    actualizarSubFamilia(subfamiliaRequest: SubFamiliaRequest): Observable<PaneraResultResponse<SubFamiliaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.put<PaneraResultResponse<SubFamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_SUB_FAMILIA
            + '/' + subfamiliaRequest.id, subfamiliaRequest,
            { headers });
    }

    eliminarSubFamilia(idSubFamilia: number): Observable<PaneraResultResponse<SubFamiliaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.delete<PaneraResultResponse<SubFamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_SUB_FAMILIA
            + '/' + idSubFamilia, { headers });
    }

}
