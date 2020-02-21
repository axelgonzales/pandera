import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PermisoRequest } from './models/permiso.request';
import { PermisoResponse } from 'src/app/login/model/panera-permiso.response';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { Observable } from 'rxjs';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class SeguridadPermisoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarPermisos(permisoRequest: PermisoRequest): Observable<PaneraResultResponse<PermisoResponse[]>> {
        const params = new HttpParams().append('nombre', permisoRequest.nombre);
        return this.http.get<PaneraResultResponse<PermisoResponse[]>>(PaneraConstantes.API_SEGURIDAD_PERMISO,
            { headers : this.headers, params });
    }

}
