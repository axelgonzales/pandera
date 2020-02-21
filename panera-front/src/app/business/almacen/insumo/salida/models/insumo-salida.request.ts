import { InsumoSalidaDetalleRequest } from './insumo-salida-detalle.request';

export class InsumoSalidaRequest {
    public id: number;
    public idTipo: number;
    public idAlmacen: number;
    public idPedido: number;
    public numPedido: string;
    public idEstado: number;
    public observacion: string;
    public fecha: string;
    public insumos: InsumoSalidaDetalleRequest[];
}
