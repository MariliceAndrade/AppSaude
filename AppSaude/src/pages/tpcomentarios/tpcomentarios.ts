import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { EditarTopicoPage } from '../editar-topico/editar-topico';
import { EditarComentPage } from '../editar-coment/editar-coment';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tpcomentarios',
  templateUrl: 'tpcomentarios.html',
})
export class TpcomentariosPage {

  itemRef: any;
  idUser: any;
  mensagem = '';
  comentsRef: AngularFireList<any>;
  coments: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private afAuth: AngularFireAuth, public modalCtrl: ModalController) {
    this.itemRef = this.navParams.get('topico'); //itemRef está pegando o parametro (valor: é a referencia do tópico selecionado) enviado pela função que está na página home.ts, chama essa página e envia a váriavel "topico"

    this.comentsRef = db.list('/comentarios/' + this.itemRef.key); //acessando a lista de todos os comentários do tópico selecionado (itemRef.key)
    this.coments = this.comentsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() //retornando a lista dos comentários com todos os valores incluindo a key(chave), do tópico selecionado
    }));
   });
   console.log(this.coments);
  }

  public get currenUser(): firebase.User { //recuperando a key UID do usuário logado, através do currentUser
    return this.afAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log( this.itemRef);
    console.log('ionViewDidLoad TpcomentariosPage');

    this.idUser = this.currenUser.uid; //idUser recebendo o ID do usuário logado para comparar no ngIf
    console.log(this.idUser);
  }

  addcomentario(itemRef, mensagem: string){
    console.log(itemRef);
    const msg = {
          activeLike: false,
          mensagem: mensagem,
          time: new Date().getTime(),
          uid: this.currenUser.uid,
          nome: this.currenUser.displayName,
          foto: this.currenUser.photoURL
        };

    return this.db.database.ref('comentarios').child(this.itemRef.key).push(msg) //adicionando um novo comentário no banco, na itemRef.key(chave) do tópico responsável 
      .then(() => (this.mensagem = ''), reason => console.error(reason));
  }

  curtirActiveTopico(item, value){
    console.log(value);
    this.db.object('/mensagens/' + item.key).update( {activeLike: value} );
  }

  editarTopico(itemRef) {
    console.log(itemRef.key);
    console.log(itemRef.mensagem);

    let editarModal = this.modalCtrl.create(EditarTopicoPage, {topico: itemRef});
    editarModal.present();
  }

  removerTopico(itemRef) {
    console.log(itemRef.key);
    this.db.object('/mensagens/' + itemRef.key).remove() //remove o tópico selecionado
    .then(() => { //se ocorreu sucesso ->
      this.db.database.ref('comentarios').child(this.itemRef.key).remove(); //remove todos os comentários deste tópico selecionado
      console.log("Removido com sucesso!");
      this.navCtrl.setRoot(HomePage); //chama a página HomePage (Feed do Fórum)
    })
  }

  curtirActiveComentario(cItem, value){
    console.log(value);
    this.db.database.ref('comentarios').child(this.itemRef.key).child(cItem.key).update( {activeLike: value} );
  }

  editarcomentario(cItem){
    console.log(this.itemRef.key);

    console.log(cItem.key);
    console.log(cItem.mensagem);

    let editarModal = this.modalCtrl.create(EditarComentPage, {comentario: cItem, topicoRef: this.itemRef.key});
    editarModal.present();
  }

  removercomentario(cItem){
    console.log(this.itemRef.key);
    this.db.database.ref('comentarios').child(this.itemRef.key).child(cItem.key).remove();
  }


  protected adjustTextarea(event: any): void { //função para fazer a área de escrever um comentário expandir conforme for digitando
    let textarea: any		= event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height 	= 'auto';
    textarea.style.height 	= textarea.scrollHeight + 'px';
    return;
  }

}
