import { NgModule } from '@angular/core';
import { HomeComponent } from './panera-home.component';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      NgbModule,
    ],
    exports: [
      HomeComponent
    ],
    providers: [],
  })
  export class HomeModule {

  }