import { RecetaDetalleResponse } from './receta-detalle.response';

export class RecetaResponse {
    public id: number;
    public idTipo;
    public nomTipo: string;
    public nomReceta: string;
    public idTipoCategoria: number;
    public nomTipoCategoria: string;
    public idCategoria: number;
    public nomCategoria: string;
    public idProducto: number;
    public nomProducto: string;
    public idIntermedio: number;
    public nomIntermedio: string;
    public cantidad: number;
    public ingredientes: RecetaDetalleResponse[];
}
