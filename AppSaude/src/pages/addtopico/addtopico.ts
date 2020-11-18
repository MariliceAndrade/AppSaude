import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MensgServProvider } from '../../providers/mensg-serv/mensg-serv';

@IonicPage()
@Component({
  selector: 'page-addtopico',
  templateUrl: 'addtopico.html',
})
export class AddtopicoPage {
  
  mensagens: any;
  mensagem = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensgServ: MensgServProvider, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentarPage');
  }

  closeModal(){
    this.view.dismiss();
  }

  addtopico(mensagem: string) {
    this.mensgServ.addMensagem(mensagem)
      .then(() => (this.mensagem = ''), reason => console.error(reason));
  } 

}