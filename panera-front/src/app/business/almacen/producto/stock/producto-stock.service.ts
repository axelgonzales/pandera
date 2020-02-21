import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LOCAL_STORAGE} from 'angular-webstorage-service';
import {ProductoStockRequest} from './models/producto-stock.request';
import {Observable} from 'rxjs';
import {PaneraResultResponse} from '../../../../commons/model/panera-result.response';
import {ProductoStockResponse} from './models/producto-stock.response';
import {PaneraConstantes} from '../../../../commons/util/panera-constantes';

@Injectable()
export class ProductoStockService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
    const usuario = this.storage.get('usuario-panera');
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + usuario.token)
      .set('user-panera', usuario.usuario);
  }

  listarProductosStock(productoStockRequest: ProductoStockRequest): Observable<PaneraResultResponse<ProductoStockResponse[]>> {
    const params = new HttpParams()
      .append('idAlmacen', String(productoStockRequest.idAlmacen))
      .append('idTipoCategoria', String(productoStockRequest.idTipoCategoria))
      .append('idCategoria', String(productoStockRequest.idCategoria))
      .append('numPedido', productoStockRequest.numPedido);
    return this.http.get<PaneraResultResponse<ProductoStockResponse[]>>(PaneraConstantes.API_ALMACEN_PRODUCTO_STOCK,
      { headers : this.headers, params });
  }

}
