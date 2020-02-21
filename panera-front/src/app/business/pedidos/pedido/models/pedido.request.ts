import { PedidoDetalleRequest } from './pedido-detalle.request';

export class PedidoRequest {
    public id: number;
    public idTipo: number;
    public numPedido: string;
    public idTienda: number;
    public idEstado: number;
    public idUsuario: number;
    public cliente: string;
    public telefono: string;
    public celular: string;
    public email: string;
    public fechaRegistro: string;
    public fechaProceso: string;
    public fechaEntrega: string;
    public productos: PedidoDetalleRequest[];
}
