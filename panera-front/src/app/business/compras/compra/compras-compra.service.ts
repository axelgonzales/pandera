import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaneraConstantes } from 'src/app/commons/util/panera-constantes';
import { PaneraResultResponse } from 'src/app/commons/model/panera-result.response';
import { CompraRequest } from './models/compra.request';
import { CompraResponse } from './models/compra.response';

@Injectable()
export class ComprasCompraService {

    constructor(private http: HttpClient) {
    }

   listarCompras(compraRequest: CompraRequest): Observable<PaneraResultResponse<CompraResponse[]>> {
        const headers = new HttpHeaders();
        const params = new HttpParams().append('idProveedor', String(compraRequest.idProveedor))
                                       .append('serie', compraRequest.serie)
                                       .append('idTipoDocumento', String(compraRequest.idTipoDocumento))
                                       .append('documento', compraRequest.documento)
                                       .append('fecha', compraRequest.fecha)
                                       .append('idEstado', String(compraRequest.idEstado));
        return this.http.get<PaneraResultResponse<CompraResponse[]>>(PaneraConstantes.API_COMPRAS_COMPRA,
            { headers, params });
   }

   obtenerCompra(idCompra: number): Observable<PaneraResultResponse<CompraResponse>> {
        const headers = new HttpHeaders();
        return this.http.get<PaneraResultResponse<CompraResponse>>(PaneraConstantes.API_COMPRAS_COMPRA + '/' + idCompra,
            { headers });
   }


    registrarCompra(compraRequest: CompraRequest): Observable<PaneraResultResponse<CompraResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.post<PaneraResultResponse<CompraResponse>>(PaneraConstantes.API_COMPRAS_COMPRA,
            compraRequest, { headers });
    }

    actualizarCompra(compraRequest: CompraRequest): Observable<PaneraResultResponse<CompraResponse>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-panera', 'lann');
        return this.http.put<PaneraResultResponse<CompraResponse>>(PaneraConstantes.API_COMPRAS_COMPRA + '/' + compraRequest.id,
        compraRequest, { headers });
    }

}
