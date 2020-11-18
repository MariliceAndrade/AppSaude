import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class AuthServProvider {

  userRef: AngularFireList<any>;
  users: Observable<any[]>;

  constructor(public http: HttpClient, public angularFireDb: AngularFireDatabase) {
    this.userRef = angularFireDb.list('/users'); //recuperando a lista de usuários no Realtime Database

    // this.userRef = angularFireDb.list('/users');
    //   this.users = this.userRef.snapshotChanges().map(changes => {
    //       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
    //   }));
    //  });
  }

  createAuthUser(user: {name: string, email: string, userID: string}){ //criando usuário no Realtime Database
    return this.angularFireDb.list('/users').push(user);

  }

}
