import { Injectable, Inject } from '@angular/core';
import { ProductoResponse } from './models/producto.response';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { ProductoRequest } from './models/product.request';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class ProductoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarProductos(productoRequest: ProductoRequest): Observable<PaneraResultResponse<ProductoResponse[]>> {
        const params = new HttpParams()
                        .append('idCategoria', String(productoRequest.idCategoria))
                        .append('idTipoCategoria', String(productoRequest.idTipoCategoria))
                        .append('nombre', productoRequest.nombre);
        return this.http.get<PaneraResultResponse<ProductoResponse[]>>(PaneraConstantes.API_ALMACEN_PRODUCTO,
            { headers : this.headers, params });
    }

    obtenerProducto(idProducto: number): Observable<PaneraResultResponse<ProductoResponse>> {
        return this.http.get<PaneraResultResponse<ProductoResponse>>(PaneraConstantes.API_ALMACEN_PRODUCTO + '/' + idProducto,
            { headers : this.headers });
    }

    registrarProducto(productoRequest: ProductoRequest): Observable<PaneraResultResponse<ProductoResponse>> {
        return this.http.post<PaneraResultResponse<ProductoResponse>>(PaneraConstantes.API_ALMACEN_PRODUCTO, productoRequest,
            { headers : this.headers });
    }

    actualizarProducto(productoRequest: ProductoRequest): Observable<PaneraResultResponse<ProductoResponse>> {
        return this.http.put<PaneraResultResponse<ProductoResponse>>(PaneraConstantes.API_ALMACEN_PRODUCTO + '/' + productoRequest.id,
            productoRequest, { headers : this.headers });
    }


}
