import { DevolucionDetalleRequest } from './devolucion-detalle.request';

export class DevolucionRequest {
    public id: number;
    public idAlmacen: number;
    public idTienda: number;
    public idEstado: number;
    public idUsuario: number;
    public numDevolucion: string;
    public fechaDevolucion: string;
    public observacion: string;
    public productos: DevolucionDetalleRequest[];
}
