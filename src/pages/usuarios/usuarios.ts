import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { UsuarioServiceProvider } from '../../providers/usuario-service';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  public infoUsuarios: any[] = [];
  public infoUsuariosBuscar: any[] = [];
  public infoUsuariosContador: any;
  public textoSearchBar: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioService: UsuarioServiceProvider, public menuCtrl: MenuController,
    public httpModule: HttpModule, public http: Http, public loadingCtrl: LoadingController) {
    this.menuCtrl.close("left");
    this.menuCtrl.enable(false, "left");
  }

  ionViewDidLoad() {
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
        // console.log(data[a].firstname);
        this.infoUsuarios.push(data[a]);
        this.infoUsuariosBuscar.push(data[a]);
        this.infoUsuariosContador = this.infoUsuarios.length;
      }
      loading.dismiss();
      // console.log(this.infoUsuarios);
      // console.log(data);
    })
  }

  /**
   * Método que permite realizar
   * la búsqueda de algun usuario
   * en este caso por nombre o apellido
   * o identificacion
   */
  getUsuariosQuery(ev) {
    this.infoUsuarios = this.infoUsuariosBuscar;
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.infoUsuarios = this.infoUsuariosBuscar;
      return;
    }
    this.infoUsuarios = this.queryUsuariosCan({
      firstname: val, //nombre para la búsqueda
      lastname: val, //apellido para la búsqueda
      identification: val //identificación para la búsqueda
    });
    this.infoUsuariosContador = this.infoUsuarios.length;
  }

  queryUsuariosCan(params?: any) {
    if (!params) {
      return this.infoUsuarios;
    }
    return this.infoUsuarios.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  doRefresh(refresher) {
    this.textoSearchBar = "";
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }



}
