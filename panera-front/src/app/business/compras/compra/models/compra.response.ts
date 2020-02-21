import { CompraDetalleResponse } from './compra-detalle.response';

export class CompraResponse {
    public id = 0;
    public idProveedor = 0;
    public nomProveedor: string;
    public idTienda = 0;
    public nomTienda: string;
    public idCondicionPago = 0;
    public nomCondicionPago: string;
    public idModoPago = 0;
    public nomModoPago: string;
    public idTipoDocumento = 0;
    public nomTipoDocumento: string;
    public idEstado = 0;
    public nomEstado: string;
    public serie: string;
    public documento: string;
    public precioTotal: number;
    public fechaEmision: string;
    public fechaCancelacion: string;
    public insumos: CompraDetalleResponse[];
}
