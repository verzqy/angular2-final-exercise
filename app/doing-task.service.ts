import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DoingTaskService {
  constructor(private http: Http) { }

  get(status) {
    let searchParams = new URLSearchParams();
    searchParams.append('status1', status);
    return this.http.get('status2', { search: searchParams })
      .map(response => {
        return response.json().filterTask2;
      });
  }

  add(doingTask) {
    doingTask.doneStatus = "No";
    return this.http.post('statusAdd', doingTask)
      .map(response => {});
  }

  edit(doingTask) {
    doingTask.doneStatus = "Yes";
    return this.http.post('statusEdit', doingTask)
      .map(response => {});
  }

  delete(doingTask) {
    return this.http.delete(`statusDel/${doingTask.id}`)
      .map(response => {});
    }
  }

  // setDone(doingTask) {
  //   // let index = this.doingTasks.indexOf(doingTask);
  //   // if (index >= 0) {
  //   //   this.doingTasks[index].doneStatus = true;
  //   //   let date = new Date();
  //   //   this.doingTasks[index].doingOn = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString();
  //   // }
  // }

  // doingTasks = [
  //   {
  //     id: 1,
  //     name: "Coding html5",
  //     doneStatus: true,
  //     doingOn: "01/04/2017"
  //   },
  //   {
  //     id: 2,
  //     name: "Coding css3",
  //     doneStatus: true,
  //     doingOn: "02/04/2017"
  //   }, {
  //     id: 3,
  //     name: "Coding javascript",
  //     doneStatus: true,
  //     doingOn: "03/04/2017"
  //   }, {
  //     id: 4,
  //     name: "Coding angular 2",
  //     doneStatus: false,
  //     doingOn: null
  //   }
  // ];
}
