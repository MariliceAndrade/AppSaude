import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { SobrePage } from '../pages/sobre/sobre';
import { ComentarPage } from '../pages/comentar/comentar';
import { AddtopicoPage } from '../pages/addtopico/addtopico';
import { EditarTopicoPage } from '../pages/editar-topico/editar-topico';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from'@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AuthServProvider } from '../providers/auth-serv/auth-serv';
import { MensgServProvider } from '../providers/mensg-serv/mensg-serv';
import { LoginServProvider } from '../providers/login-serv/login-serv';
import {MomentModule} from 'angular2-moment';
import { TpcomentariosPage } from '../pages/tpcomentarios/tpcomentarios';
import { EditarComentPage } from '../pages/editar-coment/editar-coment';


const firebaseConfig = {
  apiKey: "AIzaSyDiO9kcr9g41hKeoh_5kLJ_3UYA22ZUQTY",
  authDomain: "loginappsaude1.firebaseapp.com",
  databaseURL: "https://loginappsaude1.firebaseio.com",
  projectId: "loginappsaude1",
  storageBucket: "loginappsaude1.appspot.com",
  messagingSenderId: "207111658457"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    SobrePage,
    ComentarPage,
    EditarTopicoPage,
    AddtopicoPage,
    TpcomentariosPage,
    EditarComentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    SobrePage,
    ComentarPage,
    EditarTopicoPage,
    AddtopicoPage,
    TpcomentariosPage,
    EditarComentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServProvider,
    MensgServProvider,
    LoginServProvider
  ]
})
export class AppModule {}
