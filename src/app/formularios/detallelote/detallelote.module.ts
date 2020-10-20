import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallelotePageRoutingModule } from './detallelote-routing.module';

import { DetallelotePage } from './detallelote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallelotePageRoutingModule
  ],
  declarations: [DetallelotePage]
})
export class DetallelotePageModule {}
