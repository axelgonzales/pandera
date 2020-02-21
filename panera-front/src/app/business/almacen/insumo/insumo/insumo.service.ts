import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { InsumoRequest } from './models/insumo.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { InsumoResponse } from './models/insumo.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class InsumoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarInsumos(insumoRequest: InsumoRequest): Observable<PaneraResultResponse<InsumoResponse[]>> {
        const params = new HttpParams()
                            .append('idCategoria', String(insumoRequest.idCategoria))
                            .append('nombre', insumoRequest.nombre);
        return this.http.get<PaneraResultResponse<InsumoResponse[]>>(PaneraConstantes.API_ALMACEN_INSUMO,
        { params, headers : this.headers });
    }

    obtenerInsumo(idInsumo: number): Observable<PaneraResultResponse<InsumoResponse>> {
        return this.http.get<PaneraResultResponse<InsumoResponse>>(PaneraConstantes.API_ALMACEN_INSUMO + '/' + idInsumo,
        { headers : this.headers });
    }

    registrarInsumo(insumoRequest: InsumoRequest): Observable<PaneraResultResponse<InsumoResponse>> {
        return this.http.post<PaneraResultResponse<InsumoResponse>>(PaneraConstantes.API_ALMACEN_INSUMO, insumoRequest,
            { headers : this.headers });
    }

    actualizarInsumo(insumoRequest: InsumoRequest): Observable<PaneraResultResponse<InsumoResponse>> {
        return this.http.put<PaneraResultResponse<InsumoResponse>>(PaneraConstantes.API_ALMACEN_INSUMO + '/' + insumoRequest.id,
            insumoRequest, { headers : this.headers });
    }

}
