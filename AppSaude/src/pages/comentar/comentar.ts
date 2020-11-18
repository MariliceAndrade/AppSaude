import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MensgServProvider } from '../../providers/mensg-serv/mensg-serv';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-comentar',
  templateUrl: 'comentar.html',
})
export class ComentarPage {

  mensagens: any;
  mensagem = '';

  itemRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensgServ: MensgServProvider, private view: ViewController,
    private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.itemRef = this.navParams.get('topico');
  }

  public get currenUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentarPage');
    console.log(this.itemRef.key);
    console.log(this.itemRef.mensagem);
  }

  closeModal(){
    this.view.dismiss();
  }

  addcomentario(mensagem: string) {
    console.log(mensagem);
    const msg = {
          //activeLike: false,
          mensagem: mensagem,
          time: new Date().getTime(),
          uid: this.currenUser.uid,
          nome: this.currenUser.displayName,
          foto: this.currenUser.photoURL
        };

    return this.db.database.ref('comentarios').child(this.itemRef.key).push(msg)
      .then(() => (this.mensagem = ''), reason => console.error(reason));
    
    // this.db.object('/mensagens/' + this.itemRef.key).set();

    // this.mensgServ.addComentario(mensagem)
    //   .then(() => (this.mensagem = ''), reason => console.error(reason));
    }

}
