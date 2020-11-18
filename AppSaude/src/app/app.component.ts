import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SobrePage } from '../pages/sobre/sobre';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  rootPage:any = LoginPage;

  userData: any = {
    email: '',
    name: '',
    photo: ''
  }

  nome: any;
  pages: Array<{icon: string, title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public auth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.auth.authState.subscribe( auth => {
      this.userData.email = auth.email;
      this.userData.name = auth.displayName;
      this.userData.photo = auth.photoURL;
      });

    this.nome = 'Eloise Miranda';

    this.pages = [
      { icon:'home', title: 'Home', component: HomePage },
      { icon:'heart', title: 'Sobre', component: SobrePage }
    ];
  }

  openPage(page) {
    // this.navCtrl.setRoot(page.component, {email: this.userData.email, nome: this.userData.name});
    this.navCtrl.setRoot(page.component);
   }

   signOut() {
    this.auth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}

