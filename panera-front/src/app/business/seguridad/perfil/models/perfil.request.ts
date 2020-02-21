import { PerfilPermisoRequest } from './perfil-permiso.request';

export class PerfilRequest{
    public id: number;
    public nombre = '';
    public descripcion: string;
    public permisos: PerfilPermisoRequest[];
}