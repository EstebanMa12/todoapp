import { Component, computed, signal, effect, inject, Injector} from '@angular/core';
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

  filter = signal<'all'|'pending'|'completed'>('all')
  changeFilter(filter: 'all'|'pending'|'completed') {
    this.filter.set(filter);
  }
  /**
   * Computed property that returns the tasks based on the current filter.
   * @returns An array of tasks filtered based on the current filter.
   */
  // Estados compuestos
  // EL computed  calcula un nuevo estado a partir de otros y siempre retorna
  // una nueva instancia de los estados que lo componen.

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


  // Using effect to save data in localStorage
  // El effect vigila cada vez que un estado cambia y permite ejecutar una logica a partir de él
  // Se puede utilizar para guardar en el localstorage o hacer peticiones http

  /**
   * Creates an instance of the HomeComponent.
   * This component is responsible for managing the home page of the application.
  */
// constructor(){
//   effect(() => {
//     console.log("Tasks have changed, saving to Local Storage");
//     const tasks = this.tasks();
//     localStorage.setItem('tasks', JSON.stringify(tasks));

//     })
//   }

  // Momento en el que se inicializa nuestro componente
  /**
   * Initializes the component.
   * Retrieves tasks from local storage if available.
   */
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if (storage){
      this.tasks.set(JSON.parse(storage));
    }
    this.trackTasks();// esto no iria si se hace con el constructor 
  }

  // Se traslada el effect a esta función porque se requiere que el effect valide los estados una vez de inicialice el componente, para que esto funcione a la función tracktask se le añade un inyector

  injector = inject(Injector) // Nota, esto solo se hace si se utiliza el effect se utiliza en otro lugar que no sea el constructor


  trackTasks(){
    effect(() => {
      console.log("Tasks have changed, saving to Local Storage");
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));

      },{injector:this.injector})
  }
}
