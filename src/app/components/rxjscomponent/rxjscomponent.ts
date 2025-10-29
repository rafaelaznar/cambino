import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';


class Persona {
  nombre: string = "";
  edad: number = 0;
}

@Component({
  selector: 'app-rxjscomponent',
  imports: [CommonModule],
  templateUrl: './rxjscomponent.html',
  styleUrl: './rxjscomponent.css',
  standalone: true
})
export class Rxjscomponent {

  listadoPersonas: Persona[] = [
    { nombre: 'Ana', edad: 28 },
    { nombre: 'Luis', edad: 34 },
    { nombre: 'María', edad: 22 },
    { nombre: 'Carlos', edad: 45 },
    { nombre: 'Lucía', edad: 30 }
  ];



  nombres$: Observable<Persona[]> = of(this.listadoPersonas);
  nombre$: Observable<Persona> = of(this.listadoPersonas[0]);  
  numero$: Observable<number> = of(Math.floor(Math.random() * 100) + 1);



  ejemplo01() {
    console.log('Ejecutando ejemplo 01 de RxJS');
    this.nombres$.subscribe({
      next: (personas) => {
        console.log('Lista de personas recibidas:');
        personas.forEach(persona => {
          console.log(`Nombre: ${persona.nombre}, Edad: ${persona.edad}`);
        });
      },
      error: (err) => console.error('Error al recibir la lista de personas:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

  ejemplo02() {
    console.log('Ejecutando ejemplo 02 de RxJS');
    this.nombre$.subscribe({
      next: (persona) => {
        console.log('persona recibida:');
        console.log(`Nombre: ${persona.nombre}, Edad: ${persona.edad}`);
      },
      error: (err) => console.error('Error al recibir la lista de personas:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

  ejemplo03() {
    console.log('Ejecutando ejemplo 03 de RxJS');
    this.numero$.subscribe({
      next: (numero) => {
        console.log('Número recibido: ' + numero);
      },
      error: (err) => console.error('Error al recibir el número:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

  ejemplo04() {
    console.log('Ejecutando ejemplo 04 de RxJS: emisión por orden');
    const numeros$: Observable<number> = of(1, 2, 3, 4, 5);
    numeros$.subscribe({
      next: (numero) => {
        console.log('Número recibido: ' + numero);
      },
      error: (err) => console.error('Error al recibir el número:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

  ejemplo05() {
    console.log('Ejecutando ejemplo 05 de RxJS: emisión de strings');

    const contador$ = new Observable<number>((observer) => {
      let count = 1;
      const interval = setInterval(() => {
        observer.next(count);
        count++;
        if (count > 7) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    });

    contador$.subscribe({
      next: (numero) => {
        console.log('Número recibido: ' + numero);
      },
      error: (err) => console.error('Error al recibir el número:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

}
