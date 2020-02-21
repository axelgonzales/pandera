import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MarcaRequest } from './models/marca.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { MarcaResponse } from './models/marca.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

export class AdministracionMarcaService {

    constructor(private http: HttpClient) {
    }

    listarMarcas(marcaRequest: MarcaRequest): Observable<PaneraResultResponse<MarcaResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams().append('nombre', marcaRequest.nombre);
        return this.http.get<PaneraResultResponse<MarcaResponse[]>>(PaneraConstantes.API_ADMINISTRACION_MARCA,
            { headers, params });
    }

    obtenerMarca(idMarca: number): Observable<PaneraResultResponse<MarcaResponse>> {
        const headers = new HttpHeaders();
        return this.http.get<PaneraResultResponse<MarcaResponse>>(PaneraConstantes.API_ADMINISTRACION_MARCA + '/' + idMarca,
            { headers });
    }

    registrarMarca(marcaRequest: MarcaRequest): Observable<PaneraResultResponse<MarcaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.post<PaneraResultResponse<MarcaResponse>>(PaneraConstantes.API_ADMINISTRACION_MARCA, marcaRequest,
            { headers });
    }

    actualizarMarca(marcaRequest: MarcaRequest): Observable<PaneraResultResponse<MarcaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.put<PaneraResultResponse<MarcaResponse>>(PaneraConstantes.API_ADMINISTRACION_MARCA
            + '/' + marcaRequest.id, marcaRequest, { headers });
    }

    eliminarMarca(idMarca: number): Observable<PaneraResultResponse<MarcaResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.delete<PaneraResultResponse<MarcaResponse>>(PaneraConstantes.API_ADMINISTRACION_MARCA + '/' + idMarca,
            { headers });
    }

}
