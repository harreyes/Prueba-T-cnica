import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//Para la validación de formularios
import { HttpModule, Http } from '@angular/http';

//importación de páginas
import { HomePage } from '../home/home';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public identificacion: number;
  public formauth: FormGroup;

  public infoUsuarios: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public menuCtrl: MenuController, public http: Http) {
    this.formauth = this.formBuilder.group
      ({
        identificacion:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ]
      });
    this.menuCtrl.close("left");
    this.menuCtrl.enable(false, "left");
  }

  ionViewDidLoad() {
    this.cargarUsuarios();
  }

  ionViewDidEnter() {
    this.cargarUsuarios();
  }

  /**
* Método que consume el JSON de usuarios para listarlos
*/
  cargarUsuarios() {
    let loading = this.loadingCtrl.create({
      content: 'Procesando Informacion...'
    });
    loading.present();
    this.http.get('https://testbankapi.firebaseio.com/clients.json').map(res => res.json()).subscribe(data => {
      for (var a in data) {
        this.infoUsuarios.push(data[a]);
      }
      loading.dismiss();
    })
  }

  /**
   * Se comprueba si la identificación
   * existe o no para permitir el ingreso
   */
  goIngreso() {
    let identificacionEncontrada = this.infoUsuarios.find((element) => {
      return element.identification == this.identificacion;
    })
    if (identificacionEncontrada != undefined) {
      this.navCtrl.setRoot(HomePage);
      localStorage.setItem('lstKey', identificacionEncontrada)
    }
    else {
      this.alerta("Cliente no encontrado, vuelva a intentar");
    }
  }

  //Ir a la pantalla de registro
  goRegistro() {
    this.navCtrl.push(RegistroClientePage);
  }

  alerta(mensaje: string) {
    this.alertCtrl.create({
      message: mensaje,
      buttons: ['Ok']
    }).present();
  }

}
