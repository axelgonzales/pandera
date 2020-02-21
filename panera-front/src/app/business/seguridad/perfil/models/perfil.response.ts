import { PerfilPermisoResponse } from './perfil-permiso.response';

export class PerfilResponse {
    public id: number;
    public nombre: string;
    public descripcion: string;
    public permisos: PerfilPermisoResponse[];
}
