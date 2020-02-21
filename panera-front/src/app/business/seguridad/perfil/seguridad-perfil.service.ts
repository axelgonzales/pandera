import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilResponse } from './models/perfil.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PerfilRequest } from './models/perfil.request';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class SeguridadPerfilService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarPerfiles(perfilRequest: PerfilRequest): Observable<PaneraResultResponse<PerfilResponse[]>> {
        const params = new HttpParams().append('nombre', perfilRequest.nombre);
        return this.http.get<PaneraResultResponse<PerfilResponse[]>>(PaneraConstantes.API_SEGURIDAD_PERFIL,
            { headers : this.headers, params });
    }

    obtenerPerfil(idPerfil: number): Observable<PaneraResultResponse<PerfilResponse>> {
        return this.http.get<PaneraResultResponse<PerfilResponse>>(PaneraConstantes.API_SEGURIDAD_PERFIL + '/' + idPerfil,
            { headers : this.headers });
    }

    registrarPerfil(perfilRequest: PerfilRequest): Observable<PaneraResultResponse<PerfilResponse>> {
        return this.http.post<PaneraResultResponse<PerfilResponse>>(PaneraConstantes.API_SEGURIDAD_PERFIL,
            perfilRequest, { headers : this.headers });
    }

    actualizarPerfil(perfilRequest: PerfilRequest): Observable<PaneraResultResponse<PerfilResponse>> {
        return this.http.put<PaneraResultResponse<PerfilResponse>>(PaneraConstantes.API_SEGURIDAD_PERFIL + '/' + perfilRequest.id,
            perfilRequest, { headers : this.headers });
    }

}
