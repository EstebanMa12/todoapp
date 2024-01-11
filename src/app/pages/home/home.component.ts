import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  tasks = signal([
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
  ])
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  deleteTask(index:number){
    this.tasks.update((tasks) => tasks.filter((task, i) => i !== index));
  }
  isCompleted = false;
  completedTask(){
    this.isCompleted = !this.isCompleted;
  }


}
