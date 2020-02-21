import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { IntermedioSalidaResponse } from './models/intermedio-salida.response';
import { IntermedioSalidaRequest } from './models/intermedio-salida.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class IntermedioSalidaService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarSalidaIntermedios(intermedioSalidaRequest: IntermedioSalidaRequest):
                            Observable<PaneraResultResponse<IntermedioSalidaResponse[]>> {
        const params = new HttpParams()
                            .append('idTipo', String(intermedioSalidaRequest.idTipo))
                            .append('idEstado', String(intermedioSalidaRequest.idEstado))
                            .append('numPedido', intermedioSalidaRequest.numPedido)
                            .append('fecha', intermedioSalidaRequest.fecha);
        return this.http.get<PaneraResultResponse<IntermedioSalidaResponse[]>>(PaneraConstantes.API_ALMACEN_INTERMEDIO_SALIDA,
        { params, headers : this.headers });
    }

    obtenerSalidaIntermedio(idIntermedioSalida: number): Observable<PaneraResultResponse<IntermedioSalidaResponse>> {
        return this.http.get<PaneraResultResponse<IntermedioSalidaResponse>>(PaneraConstantes.API_ALMACEN_INTERMEDIO_SALIDA
            + '/' + idIntermedioSalida, { headers : this.headers });
    }

    registrarSalidaIntermedio() {

    }

    actualizarSalidaIntermedio(intermedioSalidaRequest: IntermedioSalidaRequest):
                               Observable<PaneraResultResponse<IntermedioSalidaResponse>> {
        return this.http.put<PaneraResultResponse<IntermedioSalidaResponse>>(PaneraConstantes.API_ALMACEN_INTERMEDIO_SALIDA
            + '/' + intermedioSalidaRequest.id, intermedioSalidaRequest, { headers : this.headers });
    }

}
