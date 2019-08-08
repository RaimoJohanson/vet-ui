import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DatasetStoreService {

  private readonly _list = new BehaviorSubject([]);

  readonly list$ = this._list.asObservable();

  get list() {
    return this._list.getValue();
  }
  set list(val) {
    this._list.next(val);
  }

  update(arr) {
    this.list = arr;
  }
}