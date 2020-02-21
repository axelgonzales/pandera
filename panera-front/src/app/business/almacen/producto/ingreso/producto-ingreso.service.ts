import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { ProductoIngresoRequest } from './models/producto-ingreso.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { ProductoIngresoResponse } from './models/producto-ingreso.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class ProductoIngresoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarIngresoProductos(productoIngresoRequest: ProductoIngresoRequest): Observable<PaneraResultResponse<ProductoIngresoResponse[]>> {
        const params = new HttpParams()
                            .append('idTipo', String(productoIngresoRequest.idTipo))
                            .append('idEstado', String(productoIngresoRequest.idEstado))
                            .append('numPedido', productoIngresoRequest.numPedido)
                            .append('fecha', productoIngresoRequest.fechaIngreso);
        return this.http.get<PaneraResultResponse<ProductoIngresoResponse[]>>(PaneraConstantes.API_ALMACEN_PRODUCTO_INGRESO,
        { params, headers : this.headers });
    }

    obtenerIngresoProducto(idProductoIngreso: number): Observable<PaneraResultResponse<ProductoIngresoResponse>> {
        return this.http.get<PaneraResultResponse<ProductoIngresoResponse>>(PaneraConstantes.API_ALMACEN_PRODUCTO_INGRESO
            + '/' + idProductoIngreso, { headers : this.headers });
    }

    registrarIngresoProducto() {

    }

    actualizarIngresoProducto(productoIngresoRequest: ProductoIngresoRequest): Observable<PaneraResultResponse<ProductoIngresoResponse>> {
        return this.http.put<PaneraResultResponse<ProductoIngresoResponse>>(PaneraConstantes.API_ALMACEN_PRODUCTO_INGRESO
            + '/' + productoIngresoRequest.id, productoIngresoRequest, { headers : this.headers });
    }

}
