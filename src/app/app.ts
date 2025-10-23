import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Landing } from './components/landing/landing';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Landing],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cambino');
}
