import { Component, OnInit, Inject } from '@angular/core';
import { PaneraLoginService } from './panera-login.service';
import { Router } from '@angular/router';
import { LoginRequest } from './model/panera-login.request';
import { LoginResponse } from './model/panera-login.response';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioResponse } from '../business/seguridad/usuario/models/usuario.response';
import { UsuarioRequest } from '../business/seguridad/usuario/models/usuario.request';
import { PaneraVistaUtils } from '../commons/util/panera-vista-util';
 

@Component({
    selector: 'app-panera-login',
    templateUrl: './panera-login.component.html',
    providers: [PaneraLoginService],
    styleUrls: ['./panera-login.component.scss']
  })

  export class LoginComponent {
    closeResult: string;

    public usuario: string;
    public contrasena: string;
    public loginRequest: LoginRequest;
    public loginResponse: LoginResponse;
    public usuarioResponse: UsuarioResponse;
    public usuarioRequest: UsuarioRequest;

    public usuario_2: string;
    public password_2:string;
    public id_usuario:number;
    public id_tienda:number;

    constructor(private router: Router,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService,
                private loginService: PaneraLoginService,
                private modalService: NgbModal) {
      this.loginRequest = new LoginRequest();
      this.usuarioRequest = new UsuarioRequest();
    }

    loginUsuario(modalError: any) {
      PaneraVistaUtils.mostrarLoading(true);
      this.loginRequest.usuario = this.usuario;
      this.loginRequest.contrasena = this.contrasena;
      this.loginService.loginUsuario(this.loginRequest).subscribe(
        data => {
          if (data.success) {
            this.loginResponse = data.result;
            this.storage.set('usuario-panera', this.loginResponse);
            this.router.navigate(['home']);
          } else {
            this.modalService.open(modalError);
          }
          PaneraVistaUtils.mostrarLoading(false);
        },
        err => {
          console.log(err);
          PaneraVistaUtils.mostrarLoading(false);
          this.modalService.open(modalError);
        }
      );
    }


    forgetPassword(content1,content2,content3,content4){
      //this.mostrarLoading(true);
      if(this.usuario != ''){
        this.usuarioRequest.usuario = this.usuario;
        this.usuarioRequest.nombre = '';
        this.usuarioRequest.apellido = '';
        this.loginService.listarUsuarios(this.usuarioRequest).subscribe(
          data => {
            if(data.success){
              if(data.result.length > 0){
                this.modalService.open(content1);
                this.usuario_2 = this.usuario;
                this.id_usuario = data.result[0].id;
                this.id_tienda = data.result[0].idTienda;
                //this.mostrarLoading(false);
              }else{
                //this.mostrarLoading(false);
                //this.modalService.open(content3);
              }
            }
            else{
              //this.mostrarLoading(false);
              this.modalService.open(content3);
            }
          },
          err => { 
            console.log(err);
            //this.mostrarLoading(false);
            this.modalService.open(content3);
          }
        );
      }else{
        //this.mostrarLoading(false);
        this.modalService.open(content4);
      }
    }

    actualizarContrasena(content1,error1){
      //this.mostrarLoading(true);  
      this.usuarioRequest.contrasena = this.password_2;
      this.usuarioRequest.id = this.id_usuario;
      this.usuarioRequest.idTienda = this.id_tienda;
      this.loginService.actualizarUsuario(this.usuarioRequest).subscribe(
        data => {
          if (data.success) {
              //this.mostrarLoading(false);
              this.modalService.dismissAll();
              this.modalService.open(content1);
          } else {
              //this.mostrarLoading(false);
              this.modalService.open(error1);
          }
          
        },
        err => {
            console.log(err);
            //this.mostrarLoading(false);
            this.modalService.open(error1);
        }
      );
    }

  }
