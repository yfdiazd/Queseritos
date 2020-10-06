import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardcomprasPageRoutingModule } from './cardcompras-routing.module';

import { CardcomprasPage } from './cardcompras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardcomprasPageRoutingModule
  ],
  declarations: [CardcomprasPage]
})
export class CardcomprasPageModule {}
