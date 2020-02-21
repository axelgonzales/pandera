import { PedidoDetalleResponse } from './pedido-detalle.response';

export class PedidoResponse {
    public id: number;
    public idTipo: number;
    public nomTipo: string;
    public numPedido: string;
    public idTienda: number;
    public nomTienda: string;
    public idEstado: number;
    public nomEstado: string;
    public cliente: string;
    public telefono: string;
    public celular: string;
    public email: string;
    public fechaRegistro: string;
    public fechaProceso: string;
    public fechaEntrega: string;
    public productos: PedidoDetalleResponse[];
}
