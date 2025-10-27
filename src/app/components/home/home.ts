import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})

export class Home {

  nombre = 'Rafa';

  constructor() {
    console.log('constructor');
    this.nombre = 'Jose';
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.nombre = 'Ana';
  }

}
