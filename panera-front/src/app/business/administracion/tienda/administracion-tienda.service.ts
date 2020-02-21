import { Injectable, Inject } from '@angular/core';
import { TiendaRequest } from './models/tienda.request';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { TiendaResponse } from './models/tienda.response';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class AdministracionTiendaService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarTiendas(tiendaRequest: TiendaRequest): Observable<PaneraResultResponse<TiendaResponse[]>> {
        const params = new HttpParams()
                            .append('nombre', tiendaRequest.nombre)
                            .append('ruc', tiendaRequest.ruc);
        return this.http.get<PaneraResultResponse<TiendaResponse[]>>(PaneraConstantes.API_ADMINISTRACION_TIENDA,
            { headers : this.headers, params });
    }

    obtenerTienda(idTienda: number): Observable<PaneraResultResponse<TiendaResponse>> {
        return this.http.get<PaneraResultResponse<TiendaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIENDA + '/' + idTienda,
            { headers : this.headers });
    }

    registrarTienda(tiendaRequest: TiendaRequest): Observable<PaneraResultResponse<TiendaResponse>> {
        return this.http.post<PaneraResultResponse<TiendaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIENDA, tiendaRequest,
            { headers : this.headers });
    }

    actualizarTienda(tiendaRequest: TiendaRequest): Observable<PaneraResultResponse<TiendaResponse>> {
        return this.http.put<PaneraResultResponse<TiendaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIENDA
            + '/' + tiendaRequest.id, tiendaRequest, { headers : this.headers });
    }

    eliminarTienda(idTienda: number): Observable<PaneraResultResponse<TiendaResponse>> {
        return this.http.delete<PaneraResultResponse<TiendaResponse>>(PaneraConstantes.API_ADMINISTRACION_TIENDA + '/' + idTienda,
            { headers : this.headers });
    }

}
