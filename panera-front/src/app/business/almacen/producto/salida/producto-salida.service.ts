import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class ProductoSalidaService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage) {
        const usuario = this.storage.get('usuario-panera');
        this.headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + usuario.token)
                            .set('user-panera', usuario.usuario);
    }

    listarSalidaProductos() {

    }

    obtenerSalidaProducto() {

    }

    registrarSalidaProducto() {

    }

    actualizarSalidaProducto() {
        
    }

}
