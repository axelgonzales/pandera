import { ProductoSalidaDetalleRequest } from './producto-salida-detalle.request';

export class ProductoSalidaRequest {
    public id: number;
    public idTipo: number;
    public idAlmacen: number;
    public idPedido: number;
    public numPedido: string;
    public idEstado: number;
    public observacion: string;
    public productos: ProductoSalidaDetalleRequest[];
}
