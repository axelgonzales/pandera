import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { InsumoRequest } from '../../insumo/insumo/models/insumo.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { InsumoResponse } from '../../insumo/insumo/models/insumo.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { IntermedioRequest } from './models/intermedio.request';
import { IntermedioResponse } from './models/intermedio.response';

@Injectable()
export class IntermedioService {
    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarIntermedios(intermedioRequest: IntermedioRequest): Observable<PaneraResultResponse<IntermedioResponse[]>> {
        const params = new HttpParams()
                            .append('nombre', intermedioRequest.nombre);
        return this.http.get<PaneraResultResponse<IntermedioResponse[]>>(PaneraConstantes.API_ALMACEN_INTERMEDIO,
        { params, headers : this.headers });
    }

    obtenerIntermedio(idIntermedio: number): Observable<PaneraResultResponse<IntermedioResponse>> {
        return this.http.get<PaneraResultResponse<IntermedioResponse>>(PaneraConstantes.API_ALMACEN_INTERMEDIO + '/' + idIntermedio,
        { headers : this.headers });
    }

    registrarIntermedio(intermedioRequest: IntermedioRequest): Observable<PaneraResultResponse<IntermedioResponse>> {
        return this.http.post<PaneraResultResponse<IntermedioResponse>>(PaneraConstantes.API_ALMACEN_INTERMEDIO, intermedioRequest,
            { headers : this.headers });
    }

    actualizarIntermedio(intermedioRequest: IntermedioRequest): Observable<PaneraResultResponse<IntermedioResponse>> {
        return this.http.put<PaneraResultResponse<IntermedioResponse>>(PaneraConstantes.API_ALMACEN_INTERMEDIO + '/' + intermedioRequest.id,
        intermedioRequest, { headers : this.headers });
    }
}
