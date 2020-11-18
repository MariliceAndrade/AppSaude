import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrarPage } from '../registrar/registrar';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { LoginServProvider } from '../../providers/login-serv/login-serv';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData = {
    email : '',
    password : ''
  }

  userData: any = {
    email: '',
    name: '',
    photo: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, 
    private afAuth: AngularFireAuth, private alertCtrller: AlertController,private toastCtrl: ToastController, private loginService: LoginServProvider) {
      this.userData.email = this.navParams.get('email');
      this.userData.name = this.navParams.get('name');
      this.userData.photo = this.navParams.get('photo');

      this.onAuthStateChanged();
  }

  private onAuthStateChanged() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log("Usuário" + user);
      } else {
        console.log("No user");
      }
    });
  }

  // public get authState(): Observable<firebase.User> {
  //   return this.afAuth.authState;
  // }

  public get currenUser(): firebase.User {  //recuperando a key UID do usuário logado, através do currentUser
    return this.afAuth.auth.currentUser;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password) ////fazendo login com o email e senha criados no "resgistrar"
    .then(auth => { //se ocorrer com sucesso ->
      console.log("credencial: " + auth);
      this.navCtrl.setRoot(HomePage); //mostra o log das credenciais do login
      if(auth.user.emailVerified){ //verifica se o email é valido para entrar no app, se sim ->
        this.navCtrl.setRoot(HomePage); //chama a página HomePage(que é o Feed do Fórum)
      }
      else{ //se não avisa o usuário com um ALERT que o e-mail ainda não foi verificado
        let alert = this.alertCtrller.create({
              title: 'Verificação de Email',
              message: 'O Email não foi verificado. Por favor, confirme seu email para entrar na sua conta',
              buttons: ['OK']
            })
          alert.present();
      }
    })
    .catch(error => {
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 5000
      });
      toast.present();
    });
  }

  criarnovaconta(){
    this.navCtrl.push(RegistrarPage); //chamando a página de criar uma nova conta
  }
 
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then( //fazendo login com o Facebook
      credentials => { //se ocorrer com sucesso ->
        this.setUser(credentials.user.uid, credentials.additionalUserInfo); //chamada da função para criar user no database
        this.navCtrl.setRoot(HomePage);  //chama a página inicial, que é a home (feed do forum)
      })
      .catch(error => { //tratativa de erro, chama um toast informando que houve um erro
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 5000
        });
        toast.present();
      })
  }

  loginGoogle(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( //fazendo login com o Google(Gmail)
    credentials => { //se ocorrer com sucesso ->
      this.setUser(credentials.user.uid, credentials.additionalUserInfo); //chamada da função para criar user no database
      this.navCtrl.setRoot(HomePage); //chama a página inicial, que é a home (feed do forum)
    })
      .catch(error => { //tratativa de erro, chama um toast informando que houve um erro
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 5000
      });
      toast.present();
    })
  }

  setUser(uid: string, additionalUserInfo: any) { //criando o usuário logado por facebook ou gmail no database
    console.log(additionalUserInfo);
    this.loginService.setUser(uid, additionalUserInfo) //chama o provider (serviço LoginService). chama a função "setUser" e envia os parametros "uid" e "addadditionalUserInfo"
      .then(val => {
        console.log('Sucesso', val);
      })
      .catch(reason => console.error('Falha', reason));
  }

}
