import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudCreditoPage } from './solicitud-credito';

@NgModule({
  declarations: [
    SolicitudCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudCreditoPage),
  ],
})
export class SolicitudCreditoPageModule {}
