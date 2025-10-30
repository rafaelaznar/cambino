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
  mensajeRecibidoDelHijo: string = "";

  enviar(mensaje: string) {
    this.mensajeHijoEnviadoDesdeElPadre  = mensaje;
  }

  recibirMensajeDelHijo(mensajeRecibidoDelHijo: string) {
    this.mensajeRecibidoDelHijo = mensajeRecibidoDelHijo;
    alert("Mensaje recibido del hijo: " + this.mensajeRecibidoDelHijo);
  }

}
