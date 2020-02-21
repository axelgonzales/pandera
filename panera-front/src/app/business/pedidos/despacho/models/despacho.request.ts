import { DespachoDetalleRequest } from './despacho-detalle.request';

export class DespachoRequest {
    public id: number;
    public idAlmacen: number;
    public idEstado: number;
    public idUsuario: number;
    public numDespacho: string;
    public fechaDespacho: string;
    public observacion: string;
    public productos: DespachoDetalleRequest[];
}
