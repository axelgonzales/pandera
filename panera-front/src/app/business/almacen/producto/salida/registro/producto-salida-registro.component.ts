import { Component } from '@angular/core';
import { ProductoSalidaService } from '../producto-salida.service';

@Component({
    selector: 'app-producto-salida-registro',
    templateUrl: './producto-salida-registro.component.html',
    styleUrls: ['./producto-salida-registro.component.scss'],
    providers: [ ProductoSalidaService ]
  })
export class ProductoSalidaRegistroComponent {

}
