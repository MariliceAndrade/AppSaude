import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-editar-topico',
  templateUrl: 'editar-topico.html',
})
export class EditarTopicoPage {

  itemRef: any;
  mensagemAtual: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private db: AngularFireDatabase) {
    this.itemRef = this.navParams.get('topico');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarTopicoPage');
    console.log(this.itemRef.key);
    console.log(this.itemRef.mensagem);
  }

  closeModal(){
    this.view.dismiss();
  }

  editartopico(newMensagem) {

    this.db.object('/mensagens/' + this.itemRef.key).update( {mensagem: newMensagem} );

    // const itensRef =  this.db.list('mensagens');
    // itensRef.update( 'item.key' , {mensagem: newMensagem} );
  }

}
