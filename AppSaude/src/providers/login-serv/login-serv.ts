import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class LoginServProvider {

  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    console.log('Hello LoginServProvider Provider');
  }

  setUser(uid: string, additionalUserInfo: any) {
    return this.db.database.ref('usuarios').child(uid).set(additionalUserInfo);
  }

}
