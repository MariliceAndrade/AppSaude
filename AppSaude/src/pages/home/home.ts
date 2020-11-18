import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
//import { AngularFireAuth } from 'angularfire2/auth';

import { AddtopicoPage } from '../addtopico/addtopico';
import { EditarTopicoPage } from '../editar-topico/editar-topico';
import { ComentarPage } from '../comentar/comentar';
import { TpcomentariosPage } from '../tpcomentarios/tpcomentarios';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nome: any;
  mensagem = '';
  mensagemAtual: any;
  
  mensagens: Observable<any[]>;

  idUser: any;
  like: boolean;
  valueID: boolean;
  idRef: AngularFireList<any>;
  id: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
    private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.idRef = db.list('/mensagens');
    this.id = this.idRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
    }));
   });
   console.log(this.id);

  }

  public get currenUser(): firebase.User { //recuperando a key UID (que o firebase criou) do usuário logado, através do currentUser
    return this.afAuth.auth.currentUser;
  }

  ionViewDidLoad(){
    // this.mensagens = this.mensgServ.msgs;
    // console.log('TESTE FEED');
    // console.log(this.mensagens);

    this.idUser = this.currenUser.uid; //idUser recebendo o ID do usuário logado para comparar no ngIf
    console.log(this.idUser);
  }

  tpcomentarios(item){
    this.navCtrl.push(TpcomentariosPage, {topico: item}); //navegando para a página do tópico selecionado onde mostrará todos os comentários deste tópico
  }

  curtirActive(item, value){
    this.like = value;
    console.log(value);
    this.db.object('/mensagens/' + item.key).update( {activeLike: value} );
  }

  addcomentario(item){
    let addComentModal = this.modalCtrl.create(ComentarPage, {topico: item});
    addComentModal.present();
  }

  criarTopico(){
    let addModal = this.modalCtrl.create(AddtopicoPage);
    addModal.present();
  }
  
  editarTopico(item) {
    console.log(item.key);
    console.log(item.mensagem);

    let editarModal = this.modalCtrl.create(EditarTopicoPage, {topico: item});
    editarModal.present();

    //this.db.object('/mensagens/' + item.key).update( {mensagem: newMensagem} );

    // const itensRef =  this.db.list('mensagens');
    // itensRef.update( 'item.key' , {mensagem: newMensagem} );
  }

  removerTopico(item) {
    console.log(item.key);
    this.db.object('/mensagens/' + item.key).remove();
  }

}
