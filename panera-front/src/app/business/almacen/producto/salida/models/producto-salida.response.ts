import { ProductoSalidaDetalleResponse } from './producto-salida-detalle.response';

export class ProductoSalidaResponse {
    public id: number;
    public idTipo: number;
    public nomTipo: string;
    public idAlmacen: number;
    public nomAlmacen: string;
    public idPedido: number;
    public numPedido: string;
    public idEstado: number;
    public nomEstado: string;
    public observacion: string;
    public fechaSalida: string;
    public productos: ProductoSalidaDetalleResponse[];
}
