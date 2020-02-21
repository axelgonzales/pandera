import { ProductoIngresoDetalleRequest } from './producto-ingreso-detalle.request';

export class ProductoIngresoRequest {
    public id: number;
    public idTipo: number;
    public idAlmacen: number;
    public idPedido: number;
    public numPedido: string;
    public idEstado: number;
    public fechaIngreso: string;
    public observacion: string;
    public productos: ProductoIngresoDetalleRequest[];
}
