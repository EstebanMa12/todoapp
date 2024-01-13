import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  taskIdCounter = this.tasks.length + 1;

  /**
   * The form control for the new task input field.
   */
  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators:[
      Validators.required,
      Validators.maxLength(20),
      // Custom validation
      (control)=>{
        if(!control.value.trim().length){
          return {required:true}
        }
        return null;
      }

    ]});

  filter = signal('all')

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value;
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }
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
        if (position === index && task.completed !== true) {
          return {
            ...task,
            edited: !task.edited,
          };
        }
        return {
          ...task,
          edited: false,
        };
      })
    );
  }
  changeHandlerUpdate(event: Event, index:number){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks)=>
      tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: newTask,
          };
        }
        return task;
      })
    );
    this.updateTask(index);
  }

  changeFilter(filter: string) {
    this.filter.set(filter);
  }
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'all') {
      return tasks;
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    // Default return statement
    return tasks;
  })
}
