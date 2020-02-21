import { UsuarioPerfilResponse } from './usuario-perfil.response';

export class UsuarioResponse {
    public id: number;
    public idTienda: number;
    public usuario: string;
    public nombre: string;
    public apellido: string;
    public perfiles: UsuarioPerfilResponse[];
}
