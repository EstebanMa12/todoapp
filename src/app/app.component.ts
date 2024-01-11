import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'todoapp';
  welcome = 'Hola!';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicios',
    'Crear rutas',
    'Crear modelos',
    'Crear interfaces',
    'Crear pipes',
    'Crear directivas',
    'Crear guards',
  ]
}
