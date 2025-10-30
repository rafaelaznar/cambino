import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, concat, filter, interval, map, merge, Observable, of, Subject, take } from 'rxjs';


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
    //observable
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
    //suscripción
    contador$.subscribe({
      next: (numero) => {
        console.log('Número recibido: ' + numero);
      },
      error: (err) => console.error('Error al recibir el número:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

  ejemplo06() {
    console.log('Ejecutando ejemplo 06 de RxJS: emisión de strings');
    //observable
    const palabras$ = new Observable<string>((observer) => {
      observer.next('Hola');
      observer.next('que');
      observer.next('tal');
      observer.next('soy');
      observer.next('rafa');
      observer.complete();
    });
    //suscripción
    palabras$.subscribe({
      next: (palabra) => {
        console.log('Palabra recibida: ' + palabra);
      },
      error: (err) => console.error('Error al recibir la palabra:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

  ejemplo07() {
    console.log('Ejecutando ejemplo 07 de RxJS: emisión de strings con error');
    //observable
    const palabras$ = new Observable<string>((observer) => {
      observer.next('Hola');
      observer.next('que');
      observer.next('tal');
      observer.error('¡Ha ocurrido un error en la emisión de palabras!');
      observer.next('soy');
      observer.next('rafa');
      observer.complete();
    });
    //suscripción
    palabras$.subscribe({
      next: palabra => console.log('Palabra recibida: ' + palabra),
      error: err => console.error('Error al recibir la palabra:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }

  ejemplo08() {
    console.log('Ejecutando ejemplo 08 de RxJS: emisión con Observable.interval(10)');
    //observable
    const contador$ = interval(10);
    //suscripción
    const subscription = contador$.subscribe({
      next: numero => console.log('Número recibido: ' + numero),
      error: err => console.error('Error al recibir el número:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
    // Desuscribirse después de 5000 ms para detener la emisión
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('Desuscrito del observable de intervalo.');
    }, 5000);
  }

  // a partir de dos observables los combino con el merge y me suscribo al resultado
  ejemplo09() {
    console.log('Ejecutando ejemplo 09 de RxJS');
    const intervalo1$ = interval(810); //llega hasta el 5
    const intervalo2$ = interval(340); //llega hasta el 3
    // combinar con el operador merge  los dos intervalos 
    const combinado1$ = merge(intervalo1$, intervalo2$);
    const combinado2$ = combinado1$.pipe(
      take(20),
      // filtra todos los números pares
      filter(numero => numero % 2 === 0),
      // map para sumar 1 a cada número
      map(numero => numero + 1)
    );
    combinado2$.subscribe({
      next: numero => console.log('Número recibido: ' + numero),
      error: err => console.error('Error al recibir el número:', err),
      complete: () => console.log('Flujo de datos completado.')
    });
  }



  // a partir de 1 observable nos suscribimos con dos suscriptores diferentes
  ejemplo10() {
    console.log('Ejecutando ejemplo 10 de RxJS');
    const intervalo$ = interval(500);
    const subscription1 = intervalo$.subscribe({
      next: numero => console.log('Suscriptor 1 - Número recibido: ' + numero),
      error: err => console.error('Suscriptor 1 - Error al recibir el número:', err),
      complete: () => console.log('Suscriptor 1 - Flujo de datos completado.')
    });
    const subscription2 = intervalo$.subscribe({
      next: numero => console.log('Suscriptor 2 - Número recibido: ' + numero),
      error: err => console.error('Suscriptor 2 - Error al recibir el número:', err),
      complete: () => console.log('Suscriptor 2 - Flujo de datos completado.')
    });
    // Desuscribirse después de 5000 ms para detener la emisión
    setTimeout(() => {
      subscription1.unsubscribe();
      console.log('Desuscrito del observable de intervalo el subscriptor 1.');
    }, 5000);
    setTimeout(() => {
      subscription2.unsubscribe();
      console.log('Desuscrito del observable de intervalo el subscriptor 2.');
    }, 8000);
  }

  // pendiente observables frios vs calientes



  // concepto de subject

  ejemplo11() {
    console.log('Ejecutando ejemplo 11 de RxJS: Subject');
    const subject = new Subject<string>();
    subject.subscribe({
      next: (value) => console.log('s1: Valor recibido en el subject: ' + value),
      complete: () => console.log('s1: Flujo de datos completado en el subject.')
    });
    subject.next('Hola');
    subject.next('Mundo');
    subject.subscribe({
      next: (value) => console.log('s2: Valor recibido en el subject: ' + value),
      complete: () => console.log('s2: Flujo de datos completado en el subject.')
    });
    subject.next('¡Saludos desde el Subject!');
    subject.complete();
  }

  ejemplo12() {
    console.log('Ejecutando ejemplo 12 de RxJS: BehaviorSubject');
    const subject = new BehaviorSubject<string>('Valor inicial');
    subject.subscribe({
      next: (value) => console.log('s1: Valor recibido en el subject: ' + value),
      complete: () => console.log('s1: Flujo de datos completado en el subject.')
    });
    subject.next('Hola');
    subject.next('Mundo');
    subject.subscribe({
      next: (value) => console.log('s2: Valor recibido en el subject: ' + value),
      complete: () => console.log('s2: Flujo de datos completado en el subject.')
    });
    subject.next('¡Saludos desde el Subject!');
    subject.complete();
  }

  // ejemplos de los distintos tipos de subject: *subject, behaviorSubject, replaySubject, asyncSubject

}
