import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';

import { AuthServProvider } from '../../providers/auth-serv/auth-serv';
//import { LoginServProvider } from '../../providers/login-serv/login-serv';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  firebaseConfig: any;

  signupData = {
    userID: '',
    name: '',
    email: '',
    password: '',
    passwordRetyped: ''
  };

  authState: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private alertCtrller: AlertController, 
    private afAuth: AngularFireAuth, public authServ: AuthServProvider, private db: AngularFireDatabase) { //private loginService: LoginServProvider
      this.authState = this.afAuth.authState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  signUp() {
    if (this.signupData.password !== this.signupData.passwordRetyped) { //comparando se as senhas são iguais, caso não for chama o ALERT para informar o usuário
      let alert = this.alertCtrl.create({
        title: 'Erro',
        message: 'Sua senha e a confirmação de senha não são iguais.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    else {
      this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)//criando usuário Authentication
        .then((credentials) => { //se ocorrer com sucesso ->
          this.writeUserData(credentials.user.uid, this.signupData.name, this.signupData.email); //chamada da função para criar user no database
          console.log("Usuário cadastrado");
        })
        .catch((error) => { //tratação de erro
          console.log("Falha ao cadastrar usuário" + error.message);
        });
      firebase.auth().currentUser.sendEmailVerification().then(function () { }) //verificando se o e-mail foi validado
      let alert = this.alertCtrller.create({
        title: 'Verificação de Email',
        message: 'O Email não foi verificado. Por favor, confirme seu email para entrar na sua conta',
        buttons: ['OK']
      })
      alert.present();
      this.navCtrl.push(LoginPage, { name: this.signupData.name, email: this.signupData.email, photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/s100x100/10354686_10150004552801856_220367501106153455_n.jpg?oh=c1ba95c4666f9e9d0f0bef0a74e09b00&oe=5A532873' });

    }
  }

  writeUserData(userId, first_name, email) { //criando o usuário logado por email e senha no database
    return this.db.database.ref('usuarios').child(userId).set({
        userFirstName: first_name,
        userEmail: email
    });
  }

}