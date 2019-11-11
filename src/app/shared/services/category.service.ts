import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}
  getAll() {
    return this.db
      .list('/categories/', ref => ref.orderByChild('name'))
      .valueChanges();
  }
  add(item) {
    return this.db.list('/categories/').push(item);
  }
}
