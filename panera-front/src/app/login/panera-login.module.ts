import { NgModule } from '@angular/core';
import { LoginComponent } from './panera-login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      FormsModule,
    ],
    exports: [LoginComponent],
    providers: [],
  })
  export class LoginModule {

  }