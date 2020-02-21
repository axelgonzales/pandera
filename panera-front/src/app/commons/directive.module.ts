import { NgModule } from '@angular/core';
import { NumericDirective } from './directive/solo-numeros.directive';
import { InputNameComponent } from './input-name/input-name.component';
import { InputDescriptionComponent } from './input-description/input-description.component';
import { InputDireccionComponent } from './input-direccion/input-direccion.component';
import { InputRazonSocialComponent } from './input-razon-social/input-razon-social.component';
import { FormsModule } from '@angular/forms';
import { InputObservacionComponent } from './input-observacion/input-observacion.component';
import { InputDecimalComponent } from './input-decimal/input-decimal.component';
import { InputNumberComponent } from './input-number/input-number.component';

const DIRECTIVES = [
    NumericDirective,
    InputNameComponent,
    InputDescriptionComponent,
    InputDireccionComponent,
    InputObservacionComponent,
    InputRazonSocialComponent,
    InputDecimalComponent,
    InputNumberComponent
];

@NgModule({
    declarations: DIRECTIVES,
    imports : [FormsModule],
    exports: DIRECTIVES,
})
export class DirectiveModule {


    
}
