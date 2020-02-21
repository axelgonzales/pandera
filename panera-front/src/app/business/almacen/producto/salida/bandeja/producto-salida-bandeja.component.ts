import { Component } from '@angular/core';
import { ProductoSalidaService } from '../producto-salida.service';

@Component({
    selector: 'app-producto-salida-bandeja',
    templateUrl: './producto-salida-bandeja.component.html',
    styleUrls: ['./producto-salida-bandeja.component.scss'],
    providers: [ ProductoSalidaService ]
  })
export class ProductoSalidaBandejaComponent {

}
