import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { LoginResponse } from 'src/app/login/model/panera-login.response';

@Injectable({
    providedIn: 'root',
  })
export class PaneraService {

    constructor(@Inject(LOCAL_STORAGE) private storage) {
    }

    public obtenerUsuario(): LoginResponse {
        const usuario = this.storage.get('usuario-panera');
        return usuario;
    }

}
