import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public show: boolean;
  data: any;
  error: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.data = null;
    this.show = false;

    this.menuCtrl.enable(true, "left");
  }

  toggleLeftMenu() {
    this.menuCtrl.toggle('left');
  }

  ocultar() {
    var obj = document.getElementById('leftbut');
    obj.style.opacity = '0';
    window.setTimeout(
      function hidethis() {
        obj.style.visibility = "hidden";
      }, 200);
  }

  mostrar() {
    var obj = document.getElementById('leftbut');
    obj.style.visibility = 'visible';
    window.setTimeout(
      function showthis() {
        obj.style.opacity = '1';
      }, 200);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, "left");
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, "left");
  }

}
