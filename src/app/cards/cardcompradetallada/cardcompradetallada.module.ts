import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardcompradetalladaPageRoutingModule } from './cardcompradetallada-routing.module';

import { CardcompradetalladaPage } from './cardcompradetallada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardcompradetalladaPageRoutingModule
  ],
  declarations: [CardcompradetalladaPage]
})
export class CardcompradetalladaPageModule {}
