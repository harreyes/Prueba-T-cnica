import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//importar páginas
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Subject } from 'rxjs/Subject';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  activePage = new Subject();
  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;

  public key: any;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController,
    public events: Events) {
    platform.ready().then(() => {
      // statusBar.styleDefault();
      splashScreen.hide();
      this.iniciarApp();
      //arreglo para el menú lateral, con la lista de páginas
      this.pages = [
        { title: 'Usuarios', component: 'UsuariosPage', active: false, icon: 'person' },
        { title: 'Solicitar crédito', component: 'SolicitudCreditoPage', active: false, icon: 'cash' }
      ];
    });
  }

  /**
   * Con este método compruebo si un usuario
   * ya estaba logueado o si ingresaba a la
   * app de cero
   */
  iniciarApp() {
    this.cargarDatosSession();
    if (this.key === null) {
      this.rootPage = LoginPage;
      localStorage.clear();
    }
    else {
      this.initializeApp();
    }
  }

  /**
   * Si el usuario ya estaba logueado
   * se envía a la pantalla home
   */
  initializeApp() {
    this.rootPage = HomePage;
  }

  /**
   * Con esto compruebo si la persona
   * estaba logueada
   */
  cargarDatosSession() {
    this.key = localStorage.getItem('lstKey');
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  menuOpened(id: string) {
    this.events.publish('menu:opened', '');
  }

  menuClosed(id: string) {
    this.events.publish('menu:closed', '');
  }

  confirmarSalida() {
    let alert = this.alertCtrl.create({
      title: 'CONFIRMAR',
      message: 'Al confirmar cerrará sesión.',
      buttons: [
        {
          text: 'NO',
          handler: () => {

          }
        },
        {
          text: 'SI',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }

  logout() {
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }








}

