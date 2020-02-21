export class PaneraVistaUtils {

    public static mostrarLoading(estado: boolean) {
        document.getElementById('loaderOverlay').style.display = (estado) ? 'block' : 'none';
        if (document.getElementById('btns-bandeja') !== null) {
            document.getElementById('btns-bandeja').style.display = (!estado) ? 'block' : 'none';
        }
        if (document.getElementById('btns-guardar') !== null) {
            document.getElementById('btns-guardar').style.display = (!estado) ? 'block' : 'none';
        }
    }

    public static invalid(campo: string) {
        document.getElementById(campo).style.borderColor = 'red';
        document.getElementById(campo).style.outline =  '0 none';
    }

    public static valid(campo: string) {
        document.getElementById(campo).style.borderColor = 'gray';
        document.getElementById(campo).style.outline =  '0 none';
    }

    public static changeValue(value: string) {
        document.getElementById('btn-guardar').textContent = value;
    }

    public static cambiarBtnGuardar(value: string) {
        document.getElementById('btn-guardar').textContent = value;
    }

    public static showSuccess(message: string) {
        document.getElementById('svgSuccess').style.display = 'inline';
        document.getElementById('svgError').style.display = 'none';
        document.getElementById('successMessage').className = 'success';
        document.getElementById('successMessage').innerHTML = message;
    }

    public static showError(message: string) {
        document.getElementById('svgSuccess').style.display = 'none';
        document.getElementById('svgError').style.display = 'inline';
        document.getElementById('successMessage').className = 'error';
        document.getElementById('successMessage').innerHTML = message;
    }

}
