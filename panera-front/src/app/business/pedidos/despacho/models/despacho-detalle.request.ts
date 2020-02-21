export class DespachoDetalleRequest {
    public id: number;
    public idDespacho: number;
    public idPedido: number;
    public idProducto: number;
    public idEstado: number;
    public costoProduccion: number;
    public costoObra: number;
    public costoOtro: number;
    public precioVenta: number;
    public cantidad: number;
    public activo: string;
}
