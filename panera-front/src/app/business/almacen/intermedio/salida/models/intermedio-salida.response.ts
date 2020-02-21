import { IntermedioSalidaDetalleResponse } from './intermedio-salida-detalle.response';

export class IntermedioSalidaResponse {
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
    public intermedios: IntermedioSalidaDetalleResponse[];
}
