export class DevolucionDetalleRequest {
    public id: number;
    public idDevolucion: number;
    public idPedido: number;
    public idProducto: number;
    public idEstado: number;
    public fechaDevolucion: string;
    public cantidad: number;
    public activo: string;
}
