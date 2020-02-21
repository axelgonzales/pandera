import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoParametroRequest } from './models/tipo-parametro.request';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { TipoParametroResponse } from './models/tipo-parametro.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class AdministracionTipoParametroService {

    constructor(private http: HttpClient) {

    }

    listarTipoParametros(tipoParametroRequest: TipoParametroRequest): Observable<PaneraResultResponse<TipoParametroResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams()
                            .append('nombre', tipoParametroRequest.nombre);
        return this.http.get<PaneraResultResponse<TipoParametroResponse[]>>(PaneraConstantes.API_ADMINISTRACION_TIPO_PARAMETRO,
            { params, headers });
    }

}
