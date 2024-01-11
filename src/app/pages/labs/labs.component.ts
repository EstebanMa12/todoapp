import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.sass'
})
export class LabsComponent {
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
  clickHandler(){
    console.log('click');
  }
  dblClickHandler(){
    console.log('dblclick');
  }

}
