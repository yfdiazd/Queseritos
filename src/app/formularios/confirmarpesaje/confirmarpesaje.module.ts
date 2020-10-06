import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarpesajePageRoutingModule } from './confirmarpesaje-routing.module';

import { ConfirmarpesajePage } from './confirmarpesaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarpesajePageRoutingModule
  ],
  declarations: [ConfirmarpesajePage]
})
export class ConfirmarpesajePageModule {}
