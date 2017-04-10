import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { DoingTaskService } from './doing-task.service';

@Component({
  selector: 'mw-doing-task-form',
  templateUrl: 'app/doing-task-form.component.html',
  styleUrls: ['app/doing-task-form.component.css']
})
export class DoingTaskFormComponent {
  form;

  constructor(
    private formBuilder: FormBuilder,
    private doingTaskService: DoingTaskService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ]))
    });
  }

  onSubmit(doingTask) {
    this.doingTaskService.add(doingTask)
      .subscribe(() => {
        this.router.navigate(['/', doingTask.doneStatus]);
      });
  }
}
