import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-aviso-credito',
  templateUrl: 'aviso-credito.html',
})
export class AvisoCreditoPage {

  public datos: any;
  public mensaje: any;
  public tipo: any;
  public estado: any;
  public identificacion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.cargarEstudio();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor espere mientras se realiza el estudio de aprobación",
      duration: 3000
    });
    loader.present();
  }


  cargarEstudio() {
    this.mensaje = this.navParams.get('datos');
    this.tipo = this.navParams.get('tipo');
    if (this.tipo == 1) {
      this.estado = "Crédito aprobado";
    } else {
      this.estado = "Crédito rechazado";
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
