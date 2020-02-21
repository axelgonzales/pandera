import { ProductoIngresoDetalleResponse } from './producto-ingreso-detalle.response';

export class ProductoIngresoResponse {
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
    public fechaIngreso: string;
    public productos: ProductoIngresoDetalleResponse[];
}
