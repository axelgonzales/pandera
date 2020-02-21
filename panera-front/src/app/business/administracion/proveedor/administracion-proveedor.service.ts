import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProveedorRequest } from './models/proveedor.request';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { Observable } from 'rxjs';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { ProveedorResponse } from './models/proveedor.response';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class AdministracionProveedorService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', 'Bearer ' + usuario.token)
                                        .set('user-panera', usuario.usuario);
    }

    listarProveedores(proveedorRequest: ProveedorRequest): Observable<PaneraResultResponse<ProveedorResponse[]>> {
        const params = new HttpParams()
                            .append('razonSocial', proveedorRequest.razonSocial)
                            .append('ruc', proveedorRequest.ruc);
        return this.http.get<PaneraResultResponse<ProveedorResponse[]>>(PaneraConstantes.API_ADMINISTRACION_PROVEEDOR,
            { headers : this.headers, params });
    }

    obtenerProveedor(idProveedor: number): Observable<PaneraResultResponse<ProveedorResponse>> {
        return this.http.get<PaneraResultResponse<ProveedorResponse>>(PaneraConstantes.API_ADMINISTRACION_PROVEEDOR + '/' + idProveedor,
            { headers : this.headers });
    }

    registrarProveedor(proveedorRequest: ProveedorRequest): Observable<PaneraResultResponse<ProveedorResponse>> {
        return this.http.post<PaneraResultResponse<ProveedorResponse>>(PaneraConstantes.API_ADMINISTRACION_PROVEEDOR, proveedorRequest,
            { headers : this.headers });
    }

    actualizarProveedor(proveedorRequest: ProveedorRequest): Observable<PaneraResultResponse<ProveedorResponse>> {
        return this.http.put<PaneraResultResponse<ProveedorResponse>>(PaneraConstantes.API_ADMINISTRACION_PROVEEDOR
            + '/' + proveedorRequest.id, proveedorRequest,
            { headers : this.headers });
    }

    eliminarProveedor(idProveedor: number): Observable<PaneraResultResponse<ProveedorResponse>> {
        return this.http.delete<PaneraResultResponse<ProveedorResponse>>(PaneraConstantes.API_ADMINISTRACION_PROVEEDOR + '/' + idProveedor,
            { headers : this.headers });
    }

}
