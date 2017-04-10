import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DoingTaskService } from './doing-task.service';

@Component({
  selector: 'mw-doing-task',
  templateUrl: 'app/doing-task.component.html',
  styleUrls: ['app/doing-task.component.css']
})
export class DoingTaskComponent {
  @Input() doingTask;
  @Output() delete = new EventEmitter();
  @Output() done = new EventEmitter();

  constructor(private doingTaskService: DoingTaskService) { }

  onDelete(doingTask) {
    this.delete.emit(doingTask);
  }
  onDone(doingTask) {
    this.done.emit(doingTask);
  }
}
