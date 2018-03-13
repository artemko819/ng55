import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()

export class DataService {

  private golas = new BehaviorSubject<any>(['1','2','3']);
  goal = this.golas.asObservable();

  constructor() { }

  changeGoal(goal){
    this.golas.next(goal);
  }

}
