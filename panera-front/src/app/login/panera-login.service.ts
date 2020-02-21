
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { LoginRequest } from './model/panera-login.request';
import { Observable } from 'rxjs';
import { LoginResponse } from './model/panera-login.response';
import { PaneraResultResponse } from '../commons/model/panera-result.response';
import { PaneraConstantes } from '../commons/util/panera-constantes';
import { UsuarioResponse } from '../business/seguridad/usuario/models/usuario.response';
import { UsuarioRequest } from '../business/seguridad/usuario/models/usuario.request';

@Injectable()
export class PaneraLoginService {

    constructor(private http: HttpClient) {

    }

    loginUsuario(loginRequest: LoginRequest): Observable<PaneraResultResponse<LoginResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<PaneraResultResponse<LoginResponse>>(PaneraConstantes.API_SEGURIDAD_LOGIN,
            loginRequest, { headers : headers });
    }

    
    listarUsuarios(usuarioRequest: UsuarioRequest): Observable<PaneraResultResponse<UsuarioResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams()
                    .append('usuario', usuarioRequest.usuario)
                    .append('nombre', usuarioRequest.nombre)
                    .append('apellido', usuarioRequest.apellido);
        return this.http.get<PaneraResultResponse<UsuarioResponse[]>>(PaneraConstantes.API_SEGURIDAD_USUARIO,
                { headers, params });
    }

    actualizarUsuario(usuarioRequest: UsuarioRequest): Observable<PaneraResultResponse<UsuarioResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.put<PaneraResultResponse<UsuarioResponse>>(PaneraConstantes.API_SEGURIDAD_USUARIO + '/' + usuarioRequest.id,
            usuarioRequest, { headers });
    }
}