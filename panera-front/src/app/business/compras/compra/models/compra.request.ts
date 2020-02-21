import { CompraDetalleRequest } from './compra-detalle.request';

export class CompraRequest{
    public id: number;
    public idProveedor: number;
    public idTienda: number;
    public idCondicionPago: number;
    public idModoPago: number;
    public idEstado: number;
    public serie: string;
    public idTipoDocumento: number;
    public documento: string;
    public fecha = '';
    public fechaEmision: string;
    public fechaCancelacion: string;
    public insumos: CompraDetalleRequest[];
}
