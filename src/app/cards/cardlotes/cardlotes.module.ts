import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardlotesPageRoutingModule } from './cardlotes-routing.module';

import { CardlotesPage } from './cardlotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardlotesPageRoutingModule
  ],
  declarations: [CardlotesPage]
})
export class CardlotesPageModule {}
