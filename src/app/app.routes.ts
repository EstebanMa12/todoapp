import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';

export const routes: Routes = [{
  path: '',
  component: HomeComponent,
  pathMatch: 'full'
}, {
  path: 'labs',
  component: LabsComponent,
  pathMatch: 'full'
}];
