import { DespachoDetalleResponse } from './despacho-detalle.response';

export class DespachoResponse {
    public id: number;
    public idAlmacen: number;
    public nomAlmacen: string;
    public idEstado: number;
    public nomEstado: string;
    public numDespacho: string;
    public fechaDespacho: string;
    public observacion: string;
    public productos: DespachoDetalleResponse[];
}
