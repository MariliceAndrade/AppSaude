import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { LoginPage } from '../../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class MensgServProvider {

  msgsRef: AngularFireList<any>;
  msgs: Observable<any[]>;


  constructor(public http: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    console.log('Hello MensgServProvider Provider');

    // this.msgsRef = this.db.list('mensagens'); //retornando a lista de todos as mensagens adicionadas no banco
    // this.msgs = this.msgsRef.valueChanges();
    // this.msgs.subscribe(res => console.log(res)); //trazendo os valores da mensagem 
  }

  public get currenUser(): firebase.User { //recuperando a key UID do usuário logado, através do currentUser
    return this.afAuth.auth.currentUser;
  }

  addMensagem(mensagem: string) {
    const msg = {
      activeLike: true,
      mensagem: mensagem,
      time: new Date().getTime(),
      uid: this.currenUser.uid,
      nome: this.currenUser.displayName,
      foto: this.currenUser.photoURL
    };

    return this.db.database.ref('mensagens').push(msg); //adicionando o tópico no banco, através do angular e firebase
  }

}
