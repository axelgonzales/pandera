import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoriaRequest } from './models/categoria.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { CategoriaResponse } from './models/categoria.response';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class AdministracionCategoriaService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarCategorias(categoriaRequest: CategoriaRequest): Observable<PaneraResultResponse<CategoriaResponse[]>> {
        const params = new HttpParams()
                        .append('nombre', categoriaRequest.nombre)
                        .append('idTipo', String(categoriaRequest.idTipo));
        return this.http.get<PaneraResultResponse<CategoriaResponse[]>>(PaneraConstantes.API_ADMINISTRACION_CATEGORIA,
            { headers : this.headers, params });
    }

    obtenerCategoria(idCategoria: number): Observable<PaneraResultResponse<CategoriaResponse>> {
        return this.http.get<PaneraResultResponse<CategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_CATEGORIA + '/' + idCategoria,
            { headers : this.headers });
    }

    registrarCategoria(categoriaRequest: CategoriaRequest): Observable<PaneraResultResponse<CategoriaResponse>> {
        return this.http.post<PaneraResultResponse<CategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_CATEGORIA, categoriaRequest,
            { headers : this.headers });
    }

    actualizarCategoria(categoriaRequest: CategoriaRequest): Observable<PaneraResultResponse<CategoriaResponse>> {
        return this.http.put<PaneraResultResponse<CategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_CATEGORIA
            + '/' + categoriaRequest.id, categoriaRequest, { headers : this.headers });
    }

    eliminarCategoria(idCategoria: number): Observable<PaneraResultResponse<CategoriaResponse>> {
        return this.http.delete<PaneraResultResponse<CategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_CATEGORIA + '/' + idCategoria,
            { headers : this.headers });
    }

}
