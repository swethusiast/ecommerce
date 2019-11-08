import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.db.object(`/users/${user.uid}`).update({
      name: user.displayName,
      email: user.email,
    });
  }
  get(uid: string) {
    return this.db.object(`/users/${uid}`).valueChanges();
  }
}
