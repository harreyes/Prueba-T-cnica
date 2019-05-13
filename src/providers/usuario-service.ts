import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { UsuarioInterfaz } from '../interfaces/usuario';


@Injectable()
export class UsuarioServiceProvider {

  data: any;
  error: any;

  //url del api a consumir
  infoUsuarios: "https://testbankapi.firebaseio.com/clients.json";
  registrarUsuario: "https://testbankapi.firebaseio.com/clients.json";

  constructor(public http: Http) {
    this.data = null;
  }

  /**
   * Traer los usuarios del JSON
   */
  getInfoTestBankApi() {
    return new Promise
      (
        (resolve, reject) => {
          this.http.get(this.infoUsuarios)
            .map(res => res.json())
            .subscribe
            (
              data => { resolve(data); },
              error => { reject(error); }
            )
        }
      );
  }

  /**
 *Registrar usuarios nuevos
 * @param {UsuarioInterfaz} usuarioInfo
 * @returns {Promise} 
 */
  postUsuario(usuarioInfo: UsuarioInterfaz) {

    let url = this.registrarUsuario;
    let body = usuarioInfo;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise
      (
        (resolve, reject) => {
          this.http.post(url, body, options)
            .map(res => res.json())
            .subscribe
            (
              data => { resolve(data); },
              error => { reject(error); }
            )
        }
      );
  }

}
