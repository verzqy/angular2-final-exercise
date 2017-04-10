import { Routes, RouterModule } from '@angular/router';

import { DoingTaskFormComponent } from './doing-task-form.component';
import { DoingTaskListComponent } from './doing-task-list.component';

const appRoutes: Routes = [
  { path: 'add', component: DoingTaskFormComponent },
  { path: ':doneStatus', component: DoingTaskListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);
