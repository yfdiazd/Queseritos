import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardventasPageRoutingModule } from './cardventas-routing.module';

import { CardventasPage } from './cardventas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardventasPageRoutingModule,
   
  ],
  declarations: [CardventasPage]
})
export class CardventasPageModule {}
