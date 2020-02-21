import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TipoCategoriaRequest } from './models/tipocategoria.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { TipoCategoriaResponse } from './models/tipocategoria.response';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class AdministracionTipoCategoriaService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarTipoCategorias(tipocategoriaRequest: TipoCategoriaRequest): Observable<PaneraResultResponse<TipoCategoriaResponse[]>> {
        const params = new HttpParams()
                            .append('nombre', tipocategoriaRequest.nombre)
                            .append('tipo', tipocategoriaRequest.tipo);
        return this.http.get<PaneraResultResponse<TipoCategoriaResponse[]>>(PaneraConstantes.API_ADMINISTRACION_TIPO_CATEGORIA,
            { headers : this.headers, params });
    }

    obtenerTipoCategoria(idTipoCategoria: number): Observable<PaneraResultResponse<TipoCategoriaResponse>> {
        return this.http.get<PaneraResultResponse<TipoCategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIPO_CATEGORIA
             + '/' + idTipoCategoria, { headers : this.headers });
    }

    registrarTipoCategoria(tipocategoriaRequest: TipoCategoriaRequest): Observable<PaneraResultResponse<TipoCategoriaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.post<PaneraResultResponse<TipoCategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIPO_CATEGORIA,
            tipocategoriaRequest, { headers });
    }

    actualizarTipoCategoria(tipocategoriaRequest: TipoCategoriaRequest): Observable<PaneraResultResponse<TipoCategoriaResponse>> {
        return this.http.put<PaneraResultResponse<TipoCategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIPO_CATEGORIA
            + '/' + tipocategoriaRequest.id, tipocategoriaRequest, { headers : this.headers });
    }

    eliminarTipoCategoria(idTipoCategoria: number): Observable<PaneraResultResponse<TipoCategoriaResponse>> {
        return this.http.delete<PaneraResultResponse<TipoCategoriaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIPO_CATEGORIA
            + '/' + idTipoCategoria, { headers : this.headers });
    }

}
