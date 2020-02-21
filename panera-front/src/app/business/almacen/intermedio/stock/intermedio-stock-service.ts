import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { IntermedioStockRequest } from './models/intermedio-stock.request';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { IntermedioStockResponse } from './models/intermedio-stock.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';

@Injectable()
export class IntermedioStockService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
      const usuario = this.storage.get('usuario-panera');
      this.headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + usuario.token)
        .set('user-panera', usuario.usuario);
    }

    listarIntermediosStock(intermedioStockRequest: IntermedioStockRequest): Observable<PaneraResultResponse<IntermedioStockResponse[]>> {
      const params = new HttpParams()
        .append('idAlmacen', String(intermedioStockRequest.idAlmacen))
        .append('numPedido', intermedioStockRequest.numPedido);
      return this.http.get<PaneraResultResponse<IntermedioStockResponse[]>>(PaneraConstantes.API_ALMACEN_INTERMEDIO_STOCK,
        { headers : this.headers, params });
    }

}
