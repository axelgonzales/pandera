import { Injectable } from '@angular/core';
import { FamiliaRequest } from './models/familia.request';
import { FamiliaResponse } from './models/familia.response';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class AdministracionFamiliaService{

    constructor(private http: HttpClient) {
    }

    listarFamilias(familiaRequest: FamiliaRequest): Observable<PaneraResultResponse<FamiliaResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams().append('nombre', familiaRequest.nombre);
        return this.http.get<PaneraResultResponse<FamiliaResponse[]>>(PaneraConstantes.API_ADMINISTRACION_FAMILIA,
            { headers, params });
    }

    obtenerFamilia(idFamilia: number): Observable<PaneraResultResponse<FamiliaResponse>> {
        const headers = new HttpHeaders();
        return this.http.get<PaneraResultResponse<FamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_FAMILIA + '/' + idFamilia,
            { headers });
    }

    registrarFamilia(familiaRequest: FamiliaRequest): Observable<PaneraResultResponse<FamiliaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.post<PaneraResultResponse<FamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_FAMILIA, familiaRequest,
            { headers });
    }

    actualizarFamilia(familiaRequest: FamiliaRequest): Observable<PaneraResultResponse<FamiliaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.put<PaneraResultResponse<FamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_FAMILIA
            + '/' + familiaRequest.id, familiaRequest, { headers });
    }

    eliminarFamilia(idFamilia: number): Observable<PaneraResultResponse<FamiliaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.delete<PaneraResultResponse<FamiliaResponse>>(PaneraConstantes.API_ADMINISTRACION_FAMILIA + '/' + idFamilia,
            { headers });
    }

}
