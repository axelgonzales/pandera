import { PermisoResponse } from './panera-permiso.response';

export class PermisoPadreResponse{
    public id: number;
    public nombre: string;
    public permisos: PermisoResponse[];
}