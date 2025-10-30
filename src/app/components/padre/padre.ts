import { Component } from '@angular/core';
import { HijoComponent } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [HijoComponent],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class PadreComponent {

  mensajeHijoEnviadoDesdeElPadre: string = "Mensaje inicial para el hijo";

  enviar(mensaje: string) {
    this.mensajeHijoEnviadoDesdeElPadre  = mensaje;
  }

}
