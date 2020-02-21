import { UsuarioPerfilRequest } from './usuario-perfil.request';

export class UsuarioRequest {
    public id: number;
    public idTienda: number;
    public usuario: string;
    public contrasena: string;
    public nombre: string;
    public apellido: string;
    public perfiles: UsuarioPerfilRequest[];
}
