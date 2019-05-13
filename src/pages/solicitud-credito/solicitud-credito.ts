import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//formularios
import moment from 'moment';//para calculos con fechas

//importar páginas
import { HomePage } from '../home/home';
import { AvisoCreditoPage } from '../aviso-credito/aviso-credito';

@IonicPage()
@Component({
  selector: 'page-solicitud-credito',
  templateUrl: 'solicitud-credito.html',
})
export class SolicitudCreditoPage {

  public formauth: FormGroup;
  fecha: any;
  fechaMenosUnDia: any;
  public nombreEmpresa: any;
  public nitEmpresa: any;
  public salario: any;
  public fechaIngreso: any;
  public banderaAntiguedad: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public alertCtrl: AlertController,
    public formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.formauth = this.formBuilder.group
      ({
        nombreEmpresa: ['',
          Validators.compose
            ([
              Validators.required]
            )],
        nitEmpresa: ['',
          Validators.compose
            ([
              Validators.required]
            )],
        salario: ['',
          Validators.compose
            ([
              Validators.required,// '\\w+([-+."]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'
              Validators.pattern('\\d+$'),
              Validators.max(99999999)]
            )],
        fechaIngreso: ['',
          Validators.compose
            ([
              Validators.required]
            )]
      });
    this.menuCtrl.close("left");
    this.menuCtrl.enable(false, "left");
  }

  ionViewDidLoad() {
    this.continuar();
    this.cargarFecha();
  }

  /**
  * Método para validar que la persona
  * tiene más de un año y medio
  * de antigüedad
  * lo realicé utilizando moment.js
  * npm install moment -S
  */
  comprobarAntiguedad() {
    let a = moment(this.fechaIngreso);
    let b = moment(this.fecha);
    let diff = b.diff(a, 'days');
    if (diff < 548) {
      this.banderaAntiguedad = 0;
    }
    else {
      this.banderaAntiguedad = 1;
    }
    console.log(diff);
  }

  /**
   * Realiza los calculos respecto
   * a el salario ingresado
   */
  goAprobacion() {
    if (this.banderaAntiguedad == 1) {
      if (this.salario > 800000) {
        if (this.salario <= 1000000) {
          this.openAvisoPage("Su crédito fue aprobado por $5.000.000", 1);
        }
        else if (this.salario > 1000000 && this.salario <= 4000000) {
          this.openAvisoPage("Su crédito fue aprobado por $20.000.000", 1)
        }
        else if (this.salario > 4000000) {
          this.openAvisoPage("Su crédito fue aprobado por $50.000.000", 1)
        }

      }
      else {
        this.openAvisoPage("La solicitud de crédito fue rechazada, su salario no aplica para solicitar un crédito.", 0);
      }
    }
    else {
      this.alerta("Lo sentimos, no cumple con la antigüedad necesaria para iniciar un estudio de crédito.");
    }
  }

  openAvisoPage(item: any, tipo: any) {
    this.openModal(AvisoCreditoPage, item, tipo);
  }
  /**
   * Modal para ir a la pantalla de aprobación
   * @param pageName nombre de la página
   * @param item información a enviar
   * @param tipo 
   */
  openModal(pageName, item: any, tipo: any) {
    let modal = this.modalCtrl.create(pageName, { datos: item, tipo }, { cssClass: 'inset-modal' });
    modal.onDidDismiss(data => { this.doRefresh(null); });
    modal.present();
  }

  continuar() {
    let alert = this.alertCtrl.create({
      title: 'SOLICITUD CRÉDITO',
      message: 'A continuación encontrará un formulario de registro para solicitud de crédito, ¿desea continuar?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
          }
        },
        {
          text: 'No',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Alertas en pantalla
   * @param mensaje 
   */
  alerta(mensaje: string) {
    let alert = this.alertCtrl.create({
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  /**
   * Para que en el formulario la fecha de ingreso
   * a la empresa tenga que ser del al menos
   * un día atras
   */
  cargarFecha() {
    this.fecha = (new Date().toJSON().slice(0, 10));
    let c = moment(this.fecha);
    let d = c.subtract(1, 'days').format().slice(0, 10);
    this.fechaMenosUnDia = d;
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
