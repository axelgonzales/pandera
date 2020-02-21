import { Injectable, Inject } from '@angular/core';
import { UsuarioRequest } from './models/usuario.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { UsuarioResponse } from './models/usuario.response';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class SeguridadUsuarioService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }
    listarUsuarios(usuarioRequest: UsuarioRequest): Observable<PaneraResultResponse<UsuarioResponse[]>> {
        const params = new HttpParams()
                    .append('usuario', usuarioRequest.usuario)
                    .append('nombre', usuarioRequest.nombre)
                    .append('apellido', usuarioRequest.apellido);
        return this.http.get<PaneraResultResponse<UsuarioResponse[]>>(PaneraConstantes.API_SEGURIDAD_USUARIO,
                { headers : this.headers, params });
    }

    obtenerUsuario(idUsuario: number): Observable<PaneraResultResponse<UsuarioResponse>> {
        return this.http.get<PaneraResultResponse<UsuarioResponse>>(PaneraConstantes.API_SEGURIDAD_USUARIO + '/' + idUsuario,
                { headers : this.headers });
    }

    registrarUsuario(usuarioRequest: UsuarioRequest): Observable<PaneraResultResponse<UsuarioResponse>> {
        return this.http.post<PaneraResultResponse<UsuarioResponse>>(PaneraConstantes.API_SEGURIDAD_USUARIO, usuarioRequest,
                { headers : this.headers });
    }

    actualizarUsuario(usuarioRequest: UsuarioRequest): Observable<PaneraResultResponse<UsuarioResponse>> {
        return this.http.put<PaneraResultResponse<UsuarioResponse>>(PaneraConstantes.API_SEGURIDAD_USUARIO + '/' + usuarioRequest.id,
            usuarioRequest, { headers : this.headers });
    }

}
