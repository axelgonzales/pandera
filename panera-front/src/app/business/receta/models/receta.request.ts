import { RecetaDetalleRequest } from './receta-detalle.request';

export class RecetaRequest {
    public id: number;
    public idTipo: number;
    public nomReceta: string;
    public idProducto: number;
    public idIntermedio: number;
    public cantidad: number;
    public ingredientes: RecetaDetalleRequest[];
}
