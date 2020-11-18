import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-editar-coment',
  templateUrl: 'editar-coment.html',
})
export class EditarComentPage {

  cItem: any;
  topicoRef: any;
  mensagemAtual: any;
  mensagem = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private db: AngularFireDatabase) {
    this.cItem = this.navParams.get('comentario'); //cItem está pegando o parametro (valor: é todas as informações do comentário selecionado)
    this.topicoRef = this.navParams.get('topicoRef'); //topicoRef está pegando o parametro (valor: é a referencia do tópico selecionado)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarComentPage');
    console.log(this.topicoRef);
    console.log(this.cItem.key);
    console.log(this.cItem.mensagem);
  }

  closeModal(){
    this.view.dismiss();
  }

  editarcomentario(newMensagem) {
    console.log(this.topicoRef);

    return this.db.database.ref('comentarios').child(this.topicoRef).child(this.cItem.key).update( {mensagem: newMensagem} ) //editando o comentário no banco, na key(chave) do tópico responsável pelo comentário 
      .then(() => (this.mensagem = ''), reason => console.error(reason));

  }

}
