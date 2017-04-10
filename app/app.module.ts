import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { DoingTaskComponent } from './doing-task.component';
import { DoingTaskListComponent } from './doing-task-list.component';
import { SelectedDirective } from './selected.directive';
import { DoingTaskFormComponent } from './doing-task-form.component';
import { DoingTaskService } from './doing-task.service';
import { MockXHRBackend } from './mock-xhr-backend';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    DoingTaskComponent,
    DoingTaskListComponent,
    SelectedDirective,
    DoingTaskFormComponent
  ],
  providers: [
    DoingTaskService,
    { provide: XHRBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }