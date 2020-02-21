import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { DespachoResponse } from './models/despacho.response';
import { DespachoRequest } from './models/despacho.request';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class PedidosDespachoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarDespachos(despachoRequest: DespachoRequest): Observable<PaneraResultResponse<DespachoResponse[]>> {
        const params = new HttpParams().append('numDespacho', despachoRequest.numDespacho)
                                       .append('fechaDespacho', despachoRequest.fechaDespacho)
                                       .append('idEstado', String(despachoRequest.idEstado));
        return this.http.get<PaneraResultResponse<DespachoResponse[]>>(PaneraConstantes.API_DESPACHO,
            { headers : this.headers, params});
    }

    obtenerDespacho(idDespacho: number): Observable<PaneraResultResponse<DespachoResponse>>{
        return this.http.get<PaneraResultResponse<DespachoResponse>>(PaneraConstantes.API_DESPACHO + '/' + idDespacho,
                { headers : this.headers });
    }

    registrarDespacho(despachoRequest: DespachoRequest): Observable<PaneraResultResponse<DespachoResponse>> {
        return this.http.post<PaneraResultResponse<DespachoResponse>>(PaneraConstantes.API_DESPACHO, despachoRequest,
                { headers : this.headers });
    }

    actualizarDespacho(despachoRequest: DespachoRequest): Observable<PaneraResultResponse<DespachoResponse>> {
        return this.http.put<PaneraResultResponse<DespachoResponse>>(PaneraConstantes.API_DESPACHO + '/' + despachoRequest.id,
        despachoRequest, { headers : this.headers });
    }

}
