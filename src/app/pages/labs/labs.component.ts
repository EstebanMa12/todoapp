import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.sass'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = signal([
    'Crear proyecto',
    'Crear componentes',
    'Crear servicios',
    'Crear rutas',
    'Crear modelos',
    'Crear interfaces',
    'Crear pipes',
    'Crear directivas',
    'Crear guards',
  ]);

  clickHandler(){
    console.log('click');
  }
  dblClickHandler(){
    console.log('dblclick');
  }
  keyDownHandler(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.name.set(newValue)
  }

  // Signals
  name = signal('Esteban')
  age = signal(5)
  color = signal('red')

  changeAge(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value,10)
    this.age.set(newValue)
  }
  changeColor(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.color.set(newValue)
  }


}
