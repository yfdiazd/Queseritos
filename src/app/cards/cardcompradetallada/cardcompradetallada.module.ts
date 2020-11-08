import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardcompradetalladaPageRoutingModule } from './cardcompradetallada-routing.module';

import { CardcompradetalladaPage } from './cardcompradetallada.page';
import { CardcomprasPage } from '../cardcompras/cardcompras.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardcompradetalladaPageRoutingModule
  ],
  declarations: [CardcompradetalladaPage],
  providers: [CardcomprasPage]
})
export class CardcompradetalladaPageModule { }
