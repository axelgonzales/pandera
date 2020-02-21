import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DevolucionRequest } from './models/devolucion.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { DevolucionResponse } from './models/devolucion.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class PedidosDevolucionService {
    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarDevoluciones(devolucionRequest: DevolucionRequest): Observable<PaneraResultResponse<DevolucionResponse[]>> {
        const params = new HttpParams().append('numDevolucion', devolucionRequest.numDevolucion)
                                       .append('fechaDevolucion', devolucionRequest.fechaDevolucion)
                                       .append('idEstado', String(devolucionRequest.idEstado));
        return this.http.get<PaneraResultResponse<DevolucionResponse[]>>(PaneraConstantes.API_DEVOLUCION,
            { headers : this.headers, params});
    }

    obtenerDevolucion(idDevolucion: number): Observable<PaneraResultResponse<DevolucionResponse>>{
        return this.http.get<PaneraResultResponse<DevolucionResponse>>(PaneraConstantes.API_DEVOLUCION + '/' + idDevolucion,
                { headers : this.headers });
    }

    registrarPedido(devolucionRequest: DevolucionRequest): Observable<PaneraResultResponse<DevolucionResponse>> {
        return this.http.post<PaneraResultResponse<DevolucionResponse>>(PaneraConstantes.API_DEVOLUCION, devolucionRequest,
                { headers : this.headers });
    }

    actualizarPedido(devolucionRequest: DevolucionRequest): Observable<PaneraResultResponse<DevolucionResponse>> {
        return this.http.put<PaneraResultResponse<DevolucionResponse>>(PaneraConstantes.API_DEVOLUCION +
            '/' + devolucionRequest.id, devolucionRequest, { headers : this.headers });
    }

}