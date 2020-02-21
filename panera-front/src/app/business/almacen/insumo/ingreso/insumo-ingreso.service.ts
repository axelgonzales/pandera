import { Injectable, Inject, Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { InsumoIngresoResponse } from './models/insumo-ingreso.response';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { InsumoIngresoRequest } from './models/insumo-ingreso.request';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class InsumoIngresoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarIngresoInsumos(insumoIngresoRequest: InsumoIngresoRequest): Observable<PaneraResultResponse<InsumoIngresoResponse[]>> {
        const params = new HttpParams()
                            .append('idTipo', String(insumoIngresoRequest.idTipo))
                            .append('idEstado', String(insumoIngresoRequest.idEstado))
                            .append('fecha', insumoIngresoRequest.fecha);
        return this.http.get<PaneraResultResponse<InsumoIngresoResponse[]>>(PaneraConstantes.API_ALMACEN_INSUMO_INGRESO,
            { params, headers : this.headers });
    }

    obtenerIngresoInsumo(idInsumoIngreso: number): Observable<PaneraResultResponse<InsumoIngresoResponse>> {
        return this.http.get<PaneraResultResponse<InsumoIngresoResponse>>(PaneraConstantes.API_ALMACEN_INSUMO_INGRESO
            + '/' + idInsumoIngreso, { headers : this.headers });
    }

    registarIngresoInsumo(insumoIngresoRequest: InsumoIngresoRequest): Observable<PaneraResultResponse<InsumoIngresoResponse>> {
        return this.http.post<PaneraResultResponse<InsumoIngresoResponse>>(PaneraConstantes.API_ALMACEN_INSUMO_INGRESO,
            insumoIngresoRequest, { headers : this.headers });
    }

    actualizarInsumo(insumoIngresoRequest: InsumoIngresoRequest): Observable<PaneraResultResponse<InsumoIngresoResponse>> {
        return this.http.put<PaneraResultResponse<InsumoIngresoResponse>>(PaneraConstantes.API_ALMACEN_INSUMO_INGRESO
            + '/' + insumoIngresoRequest.id, insumoIngresoRequest, { headers : this.headers });
    }

}
