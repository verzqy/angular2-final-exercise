import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DoingTaskService } from './doing-task.service';

@Component({
  selector: 'mw-doing-task-list',
  templateUrl: 'app/doing-task-list.component.html',
  styleUrls: ['app/doing-task-list.component.css']
})
export class DoingTaskListComponent {
  doingTasks = [];
  doneStatus = '';
  paramsSubscription;

  constructor(private doingTaskService: DoingTaskService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let doneStatus = params['doneStatus'];
        if (doneStatus.toLowerCase() === 'all') {
          doneStatus = '';
        }
        this.getDoingTask(doneStatus);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onDoingTaskDelete(doingTask) {
    this.doingTaskService.delete(doingTask)
      .subscribe(() => {
        this.getDoingTask(this.doneStatus);
      });
  }

  onDoingTaskDone(doingTask) {
    this.doingTaskService.edit(doingTask)
      .subscribe(() => {
        this.getDoingTask(this.doneStatus);
      });
  }

  getDoingTask(a) {
    this.doneStatus = a;
    this.doingTaskService.get(a)
      .subscribe(x => {
        this.doingTasks = x;
      });
  }
}
