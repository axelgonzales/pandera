import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { InsumoStockRequest } from './models/insumo-stock-request';
import { InsumoStockResponse } from './models/insumo-stock.response';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { Observable } from 'rxjs';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class InsumoStockService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarInsumosStock(insumoStockRequest: InsumoStockRequest): Observable<PaneraResultResponse<InsumoStockResponse[]>> {
        const params = new HttpParams()
                            .append('idInsumo', String(insumoStockRequest.idInsumo))
                            .append('idProveedor', String(insumoStockRequest.idProveedor))
                            .append('idMarca', String(insumoStockRequest.idMarca));
        return this.http.get<PaneraResultResponse<InsumoStockResponse[]>>(PaneraConstantes.API_ALMACEN_INSUMO_STOCK,
        { params, headers : this.headers });
    }

}
