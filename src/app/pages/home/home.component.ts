import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);
  taskIdCounter = this.tasks.length + 1;
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    input.value = '';
  }
  addTask(title: string) {
    const newTask = {
      id: this.taskIdCounter,
      title,
      completed: false,
      edited:false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    this.taskIdCounter++;
  }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
  completedTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  }
  // updateTask(index: number, event: Event)
  updateTask(index: number){
    this.tasks.update((tasks) =>
      tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            edited: !task.edited,
          };
        }
        return task;
      })
    );
  }
  changeHandlerUpdate(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    input.value = '';
  }
}
