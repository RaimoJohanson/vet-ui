import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class InteractionStoreService {
  private readonly _records = new BehaviorSubject([]);
  private readonly _questionsThatWereYes = new BehaviorSubject([]);
  
  // Expose the observable$ part of the _todos subject (read only stream)
  readonly records$ = this._records.asObservable();
  readonly questionsThatWereYes$ = this._questionsThatWereYes.asObservable();

  get records() {
    return this._records.getValue();
  }
  get questionsThatWereYes() {
    return this._questionsThatWereYes.getValue();
  }
  set questionsThatWereYes(val) {
    this._questionsThatWereYes.next(val);
  }
  set records(val) {
    this._records.next(val);
  }
  updateQuestionsThatWereYes(list) {
    this.questionsThatWereYes = list;
  }
  updateInteractionRecords(list) {
    this.records = list;
  }
}