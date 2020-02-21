import { Injectable, ElementRef } from '@angular/core';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { isUndefined } from 'util';

@Injectable()
export class PaneraUtils {
    specialKeys = {
        string: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        number : [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal  : [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    }
    regex = {
        string: new RegExp(/^[a-zA-Z]/),
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    };
    
    public static obtenerFecha(fecha: any): string {
        if (fecha !== undefined){
            const anio = fecha.year;
            const mes = (fecha.month < 10) ? '0' + fecha.month : fecha.month;
            const dia = (fecha.day < 10) ? '0' + fecha.day : fecha.day;
            return dia + '/' + mes + '/' + anio;
        } else {
            return '';
        }
    }

    public static obtenerFecha2(fecha: any): string {
        if (fecha !== undefined){
            const anio = fecha.year;
            const mes = (fecha.month < 10) ? '0' + fecha.month : fecha.month;
            const dia = (fecha.day < 10) ? '0' + fecha.day : fecha.day;
            return anio + '-' + mes + '-' + dia;
        } else {
            return '';
        }

    }

    public static obtenerFechaHoyView(): any {
        const fechaHoy = new Date();
        return { year: fechaHoy.getFullYear(), month: fechaHoy.getMonth() + 1, day: fechaHoy.getDate()};
    }

    public static obtenerFechaView(fecha: string): any {
        if (fecha !== '') {
            const dia = Number(fecha.substring(0, 2));
            const mes = Number(fecha.substring(3, 5));
            const anio = Number(fecha.substring(6, 10));
            return { year: anio, month: mes, day: dia};
        } else {
            return '';
        }
    }

    public obtenerGet(param): string {
        let url = document.URL;
        url = String(url.match(/\?+.+/));
        url = url.replace('?', '');
        const url1 = url.split('&');
        let x = 0;
        while (x < url1.length){
            const p = url1[x].split('=');
            if (p[0] === param) {
                return decodeURIComponent(p[1]);
            }
            x++;
        }
    }

   
    

}
