import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PedidoResponse } from './models/pedido.response';
import { PedidoRequest } from './models/pedido.request';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { PedidoMedidaResponse } from './models/pedido-medida.response';

@Injectable()
export class PedidosPedidoService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarPedidos(pedidoRequest: PedidoRequest): Observable<PaneraResultResponse<PedidoResponse[]>> {
        const params = new HttpParams().append('numPedido', pedidoRequest.numPedido)
                                       .append('idTienda', String(pedidoRequest.idTienda))
                                       .append('fechaRegistro', pedidoRequest.fechaRegistro)
                                       .append('fechaProceso', pedidoRequest.fechaProceso)
                                       .append('fechaEntrega', pedidoRequest.fechaEntrega)
                                       .append('idEstado', String(pedidoRequest.idEstado));
        return this.http.get<PaneraResultResponse<PedidoResponse[]>>(PaneraConstantes.API_PEDIDOS_PEDIDO,
            { headers : this.headers, params});
    }

    obtenerPedido(idPedido: number): Observable<PaneraResultResponse<PedidoResponse>>{
        return this.http.get<PaneraResultResponse<PedidoResponse>>(PaneraConstantes.API_PEDIDOS_PEDIDO + '/' + idPedido,
                { headers : this.headers });
    }

    registrarPedido(pedidoRequest: PedidoRequest): Observable<PaneraResultResponse<PedidoResponse>> {
        return this.http.post<PaneraResultResponse<PedidoResponse>>(PaneraConstantes.API_PEDIDOS_PEDIDO, pedidoRequest,
                { headers : this.headers });
    }

    actualizarPedido(pedidoRequest: PedidoRequest): Observable<PaneraResultResponse<PedidoResponse>> {
        return this.http.put<PaneraResultResponse<PedidoResponse>>(PaneraConstantes.API_PEDIDOS_PEDIDO + '/' + pedidoRequest.id,
                pedidoRequest, { headers : this.headers });
    }

    listarPedidoMedidas(): Observable<PaneraResultResponse<PedidoMedidaResponse[]>> {
        return this.http.get<PaneraResultResponse<PedidoMedidaResponse[]>>(PaneraConstantes.API_PEDIDOS_MEDIDA,
            { headers : this.headers });
    }

}
