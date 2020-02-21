import { InsumoIngresoDetalleRequest } from './insumo-ingreso-detalle.request';

export class InsumoIngresoRequest {
    public id: number;
    public idTipo: number;
    public idAlmacen: number;
    public idCompra: number;
    public idEstado: number;
    public observacion: string;
    public fecha: string;
    public insumos: InsumoIngresoDetalleRequest[];
}
