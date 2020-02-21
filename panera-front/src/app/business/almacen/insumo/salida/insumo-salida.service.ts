import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { InsumoSalidaRequest } from './models/insumo-salida.request';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { Observable } from 'rxjs';
import { InsumoSalidaResponse } from './models/insumo-salida.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class InsumoSalidaService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarSalidaInsumos(insumoSalidaRequest: InsumoSalidaRequest): Observable<PaneraResultResponse<InsumoSalidaResponse[]>> {
        const params = new HttpParams()
                            .append('idTipo', String(insumoSalidaRequest.idTipo))
                            .append('idEstado', String(insumoSalidaRequest.idEstado))
                            .append('numPedido', insumoSalidaRequest.numPedido)
                            .append('fecha', insumoSalidaRequest.fecha);
        return this.http.get<PaneraResultResponse<InsumoSalidaResponse[]>>(PaneraConstantes.API_ALMACEN_INSUMO_SALIDA,
            { params, headers : this.headers });
    }

    obtenerSalidaInsumo(idSalidaIngreso: number): Observable<PaneraResultResponse<InsumoSalidaResponse>> {
        return this.http.get<PaneraResultResponse<InsumoSalidaResponse>>(PaneraConstantes.API_ALMACEN_INSUMO_SALIDA
            + '/' + idSalidaIngreso, { headers : this.headers });
    }

    registarSalidaInsumo(insumoSalidaRequest: InsumoSalidaRequest) {
    }

    actualizarSalidaInsumo(insumoSalidaRequest: InsumoSalidaRequest): Observable<PaneraResultResponse<InsumoSalidaResponse>> {
        return this.http.put<PaneraResultResponse<InsumoSalidaResponse>>(PaneraConstantes.API_ALMACEN_INSUMO_SALIDA
            + '/' + insumoSalidaRequest.id, insumoSalidaRequest, { headers : this.headers });
    }
    
}
