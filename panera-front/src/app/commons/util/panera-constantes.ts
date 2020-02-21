import { environment } from 'src/environments/environment';

export class PaneraConstantes {

    public static API_SEGURIDAD_LOGIN = environment.API_URL + '/seguridad/login';
    public static API_SEGURIDAD_PERFIL = environment.API_URL + '/seguridad/perfil';
    public static API_SEGURIDAD_USUARIO = environment.API_URL + '/seguridad/usuario';
    public static API_SEGURIDAD_PERMISO = environment.API_URL + '/seguridad/permiso';

    public static API_ADMINISTRACION_TIPO_PARAMETRO = environment.API_URL + '/administracion/tipoparametro';
    public static API_ADMINISTRACION_PARAMETRO = environment.API_URL + '/administracion/parametro';
    public static API_ADMINISTRACION_TIPO_CATEGORIA = environment.API_URL + '/administracion/tipocategoria';
    public static API_ADMINISTRACION_CATEGORIA = environment.API_URL + '/administracion/categoria';
    public static API_ADMINISTRACION_FAMILIA = environment.API_URL + '/administracion/familia';
    public static API_ADMINISTRACION_SUB_FAMILIA = environment.API_URL + '/administracion/subfamilia';
    public static API_ADMINISTRACION_PROVEEDOR = environment.API_URL + '/administracion/proveedor';
    public static API_ADMINISTRACION_TIENDA = environment.API_URL + '/administracion/tienda';
    public static API_ADMINISTRACION_ESTADO = environment.API_URL + '/administracion/estado';
    public static API_ADMINISTRACION_UNIDAD_MEDIDA = environment.API_URL + '/administracion/unidadmedida';
    public static API_ADMINISTRACION_MARCA = environment.API_URL + '/administracion/marca';

    public static API_COMPRAS_COMPRA = environment.API_URL + '/compras/compra';

    public static API_PEDIDOS_PEDIDO = environment.API_URL + '/pedidos/pedido';
    public static API_PEDIDOS_MEDIDA = environment.API_URL + '/pedidos/medida';

    public static API_DEVOLUCION = environment.API_URL + '/devolucion';
    public static API_DESPACHO = environment.API_URL + '/despachos';

    public static API_PEDIDOS_PRODUCTO = environment.API_URL + '/pedidos/productos';

    public static API_ALMACEN_INSUMO = environment.API_URL + '/almacen/insumos/insumo';
    public static API_ALMACEN_INSUMO_INGRESO = environment.API_URL + '/almacen/insumos/ingreso';
    public static API_ALMACEN_INSUMO_SALIDA = environment.API_URL + '/almacen/insumos/salida';
    public static API_ALMACEN_INSUMO_STOCK = environment.API_URL + '/almacen/insumos/stock';
    public static API_ALMACEN_INTERMEDIO = environment.API_URL + '/almacen/intermedios/intermedio';
    public static API_ALMACEN_INTERMEDIO_INGRESO = environment.API_URL + '/almacen/intermedios/ingreso';
    public static API_ALMACEN_INTERMEDIO_SALIDA = environment.API_URL + '/almacen/intermedios/salida';
    public static API_ALMACEN_INTERMEDIO_STOCK = environment.API_URL + '/almacen/intermedios/stock';

    public static API_ALMACEN_PRODUCTO = environment.API_URL + '/almacen/productos/producto';
    public static API_ALMACEN_PRODUCTO_STOCK = environment.API_URL + '/almacen/productos/stock';
    public static API_ALMACEN_PRODUCTO_INGRESO = environment.API_URL + '/almacen/productos/ingreso';
    public static API_ALMACEN_PRODUCTO_SALIDA = environment.API_URL + '/almacen/productos/salida';

    public static API_RECETA = environment.API_URL + '/receta';

    public static API_REPORTE_INSUMO = environment.API_URL + '/reportes/insumo';

    public static TIPO_TIPPARA_PAGO = '1';
    public static TIPO_TIPPARA_COMPRA = '2';

    public static TIPO_PARA_PAGO = '1';
    public static TIPO_PARA_COMPRA = '2';

    public static IN_ACTIVO = '1';
    public static IN_INACTIVO = '0';
}
