import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { RecetaRequest } from './models/receta.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { RecetaResponse } from './models/receta.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class PaneraRecetaService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarRecetas(recetaRequest: RecetaRequest): Observable<PaneraResultResponse<RecetaResponse[]>> {
        const params = new HttpParams().append('idTipo', String(recetaRequest.idTipo))
                                       .append('nomReceta', recetaRequest.nomReceta);
        return this.http.get<PaneraResultResponse<RecetaResponse[]>>(PaneraConstantes.API_RECETA,
                { params, headers : this.headers });
    }

    obtenerReceta(idReceta: number): Observable<PaneraResultResponse<RecetaResponse>> {
        return this.http.get<PaneraResultResponse<RecetaResponse>>(PaneraConstantes.API_RECETA + '/' + idReceta,
                { headers : this.headers });
    }

    registrarReceta(recetaRequest: RecetaRequest): Observable<PaneraResultResponse<RecetaResponse>> {
        return this.http.post<PaneraResultResponse<RecetaResponse>>(PaneraConstantes.API_RECETA, recetaRequest,
                { headers : this.headers });
    }

    actualizarReceta(recetaRequest: RecetaRequest): Observable<PaneraResultResponse<RecetaResponse>> {
        return this.http.put<PaneraResultResponse<RecetaResponse>>(PaneraConstantes.API_RECETA + '/' + recetaRequest.id,
                recetaRequest, { headers : this.headers });
    }

}
