import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

//Importación de páginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente';
import { LoginPage } from '../pages/login/login';

//Importación de providers
import { UsuarioServiceProvider } from '../providers/usuario-service';
import { AvisoCreditoPage } from '../pages/aviso-credito/aviso-credito';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroClientePage,
    LoginPage,
    AvisoCreditoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroClientePage,
    LoginPage,
    AvisoCreditoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsuarioServiceProvider
  ]
})
export class AppModule { }
