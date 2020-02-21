import { InsumoIngresoDetalleResponse } from './insumo-ingreso-detalle.response';

export class InsumoIngresoResponse {
    public id = 0;
    public idTipo = 0;
    public nomTipo: string;
    public idAlmacen = 0;
    public nomAlmacen: string;
    public idCompra = 0;
    public numCompra: string;
    public idEstado = 0;
    public nomEstado: string;
    public observacion: string;
    public fechaIngreso: string;
    public insumos: InsumoIngresoDetalleResponse[];
}
