import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisoCreditoPage } from './aviso-credito';

@NgModule({
  declarations: [
    AvisoCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisoCreditoPage),
  ],
})
export class AvisoCreditoPageModule {}
