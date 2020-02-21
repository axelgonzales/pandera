import { DevolucionDetalleResponse } from './devolucion-detalle.response';

export class DevolucionResponse {
    public id: number;
    public idAlmacen: number;
    public nomAlmacen: string;
    public idPedido: number;
    public numPedido: string;
    public idTienda: number;
    public nomTienda: string;
    public idEstado: number;
    public nomEstado: string;
    public numDevolucion: string;
    public observacion: string;
    public fechaDevolucion: string;
    public productos: DevolucionDetalleResponse[];
}
