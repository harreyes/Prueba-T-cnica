import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//formularios
import { HttpModule, Http } from '@angular/http';
import moment from 'moment';//para calculos con fechas

//importar páginas
import { LoginPage } from '../login/login';

//importar providers
import { UsuarioServiceProvider } from '../../providers/usuario-service';

//importar interfaces
import { UsuarioInterfaz } from '../../interfaces/usuario';

@IonicPage()
@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})
export class RegistroClientePage {

  public formauth: FormGroup;
  public nombre: string;
  public apellido: string;
  public identificacion: any;
  public fechaNacimiento: any;
  public banderaMayorEdad: any;
  fecha: any;

  public infoUsuarios: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public menuCtrl: MenuController,
    public usuarioService: UsuarioServiceProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public http: Http) {
    this.formauth = this.formBuilder.group
      ({
        nombre: ['',
          Validators.compose
            ([
              Validators.required]
            )],
        apellido: ['',
          Validators.compose
            ([
              Validators.required]
            )],
        identificacion: ['',
          Validators.compose
            ([
              Validators.required,// '\\w+([-+."]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'
              Validators.pattern('\\d+$')
            ]
            )],
        fechaNacimiento: ['',
          Validators.compose
            ([
              Validators.required]
            )]
      });
    this.menuCtrl.close("left");
    this.menuCtrl.enable(false, "left");
  }

  ionViewDidLoad() {
    this.cargarFecha();
    this.cargarUsuarios();
  }

  /**
   * Método para validar que la persona sea mayor de 18 años
   * lo realicé utilizando moment.js
   * npm install moment -S
   */
  comprobarEdad() {
    let a = moment(this.fechaNacimiento);
    let b = moment(this.fecha);
    let diff = b.diff(a, 'years');
    if (diff < 18) {
      this.banderaMayorEdad = 0;
    }
    else {
      this.banderaMayorEdad = 1;
    }
    console.log(diff);
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
   * Metodo que se comunicacon el provider e inserta la información del cliente
   * se valida si existe en la base de datos la identificación
   */
  goRegistro() {
    if (this.banderaMayorEdad == 1) {
      let identificacionEncontrada = this.infoUsuarios.find((element) => {
        console.log(element.identification);
        return element.identification == this.identificacion;
      })
      console.log(identificacionEncontrada);
      if (identificacionEncontrada == undefined) {
        let loading = this.loadingCtrl.create({
          content: 'Procesando Informacion...'
        });
        loading.present();
        let usuarioinfo = new UsuarioInterfaz(this.fechaNacimiento, this.nombre, this.apellido, this.identificacion);
        this.http.post('https://testbankapi.firebaseio.com/clients.json', usuarioinfo).map(res => res.json()).subscribe(data => {
          this.alerta("Registro con éxito, para ingresar debe escribir su identificación");
          loading.dismiss();
          this.navCtrl.setRoot(LoginPage);
        })
      }
      else {
        this.alerta("La identificación: " + this.identificacion + " ya está registrada en nuestro sistema.");
      }
    } else {
      this.alerta("Debe ser mayor de edad para poder registrarse");
    }
  }

  alerta(mensaje: string) {
    let alert = this.alertCtrl.create({
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  cancel() {
    this.navCtrl.setRoot(LoginPage);
  }

  //Fecha del día para que la fecha max
  //no supere el día actual
  cargarFecha() {
    this.fecha = (new Date().toJSON().slice(0, 10));
  }

}
