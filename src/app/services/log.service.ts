import { Log } from './../models/log.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { Observable } from 'rxjs'
import { of } from 'rxjs'

@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date:null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean> (true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated components',
    //     date: new Date('12/26/2019 12:54:23')
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Boostrap',
    //     date: new Date('12/27/2019 10:24:11')
    //   },
    //   {
    //     id: '3',
    //     text: 'Added Logs Component',
    //     date: new Date('12/27/2019 10:27:19')
    //   },
    // ]
    this.logs=[]
  }
  getLogs() :Observable<Log[]> {
    if(localStorage.getItem('logs') === null) {
      this.logs = [];

    }else { this.logs = JSON.parse(localStorage.getItem('logs'))}

    return of(this.logs.sort((a,b) => {
      return b.date = a.date;
    }))
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog (log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id ) {
        this.logs.splice(index, 1);
      }

    });
    this.logs.unshift(log);

    // Update to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog (log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id ) {
        this.logs.splice(index, 1);
      }

    });

    // Delete to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
  

}
