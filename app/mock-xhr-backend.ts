import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          // var doTasks = this._doingTasks;
          // console.log(request.url);
          // responseOptions = new ResponseOptions({
          //     body: JSON.parse(JSON.stringify(doTasks[0])),
          //     status: 200
          //   }); 
          if (request.url.indexOf('status2?status1=') >= 0 || request.url === 'status2') {
            var dStatus;
            if (request.url.indexOf('?') >= 0) {
              dStatus = request.url.split('=')[1];
              if (dStatus === 'undefined') dStatus = '';
            }
            var doTasks;
            if (dStatus) {
              doTasks = this._doingTasks.filter(filterTask => filterTask.doneStatus === dStatus);
            } else {
              doTasks = this._doingTasks;
            }
            responseOptions = new ResponseOptions({
              body: { filterTask2: JSON.parse(JSON.stringify(doTasks)) },
              status: 200
            });
          }
          // else {
          //   var id = parseInt(request.url.split('/')[1]);
          //   doTasks = this._doingTasks.filter(filterTask => filterTask.doneStatus == dStatus);
          //   responseOptions = new ResponseOptions({
          //     body: JSON.parse(JSON.stringify(doTasks[0])),
          //     status: 200
          //   });
          // }
          break;
        case RequestMethod.Post:
          var doTasksAdd = JSON.parse(request.text().toString());
          if (doTasksAdd.id >= 0) {
            var doingTask = this._doingTasks.find(doTask => doTask.id === doTasksAdd.id);
            var index = this._doingTasks.indexOf(doingTask);
            if (index >= 0) {
              this._doingTasks[index].doneStatus = "Yes";
              let date = new Date();
              this._doingTasks[index].doingOn = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString();
            }

          } else {
            doTasksAdd.id = this._getNewId();
            this._doingTasks.push(doTasksAdd);
          }
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteDoingTask(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteDoingTask(id) {
    var doingTask = this._doingTasks.find(doTask => doTask.id === id);
    var index = this._doingTasks.indexOf(doingTask);
    if (index >= 0) {
      this._doingTasks.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._doingTasks.length > 0) {
      return Math.max.apply(Math, this._doingTasks.map(mediaItem => mediaItem.id)) + 1;
    }
  }

  _doingTasks = [
    {
      id: 1,
      name: "Coding html5",
      doneStatus: "Yes",
      doingOn: "01/04/2017"
    },
    {
      id: 2,
      name: "Coding css3",
      doneStatus: "Yes",
      doingOn: "02/04/2017"
    }, {
      id: 3,
      name: "Coding javascript",
      doneStatus: "Yes",
      doingOn: "03/04/2017"
    }, {
      id: 4,
      name: "Coding angular 2",
      doneStatus: "No",
      doingOn: null
    }
  ];
}