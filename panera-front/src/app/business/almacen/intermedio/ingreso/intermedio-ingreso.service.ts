import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { IntermedioIngresoRequest } from './models/intermedio-ingreso.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { IntermedioIngresoResponse } from './models/intermedio-ingreso.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class IntermedioIngresoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarIngresoIntermedios(intermedioIngresoRequest: IntermedioIngresoRequest):
                                        Observable<PaneraResultResponse<IntermedioIngresoResponse[]>> {
        const params = new HttpParams()
                            .append('idTipo', String(intermedioIngresoRequest.idTipo))
                            .append('idEstado', String(intermedioIngresoRequest.idEstado))
                            .append('numPedido', intermedioIngresoRequest.numPedido)
                            .append('fecha', intermedioIngresoRequest.fecha);
        return this.http.get<PaneraResultResponse<IntermedioIngresoResponse[]>>(PaneraConstantes.API_ALMACEN_INTERMEDIO_INGRESO,
        { params, headers : this.headers });
    }

    obtenerIngresoIntermedio(idIntermedioIngreso: number): Observable<PaneraResultResponse<IntermedioIngresoResponse>> {
        return this.http.get<PaneraResultResponse<IntermedioIngresoResponse>>(PaneraConstantes.API_ALMACEN_INTERMEDIO_INGRESO
            + '/' + idIntermedioIngreso, { headers : this.headers });
    }

    registrarIngresoIntermedio() {

    }

    actualizarIngresoIntermedio(intermedioIngresoRequest: IntermedioIngresoRequest):
                                Observable<PaneraResultResponse<IntermedioIngresoResponse>> {
        return this.http.put<PaneraResultResponse<IntermedioIngresoResponse>>(PaneraConstantes.API_ALMACEN_INTERMEDIO_INGRESO + '/'
            + intermedioIngresoRequest.id, intermedioIngresoRequest, { headers : this.headers});
    }

}
