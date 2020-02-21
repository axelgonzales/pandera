import { PermisoPadreResponse } from './panera-permiso-padre.response';

export class LoginResponse {
    public id: number;
    public usuario: string;
    public nombre: string;
    public apellido: string;
    public idTienda: number;
    public nomTienda: string;
    public token: string;
    public permisos: PermisoPadreResponse[];
}
