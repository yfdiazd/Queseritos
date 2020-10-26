import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardlistaclientesPageRoutingModule } from './cardlistaclientes-routing.module';

import { CardlistaclientesPage } from './cardlistaclientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardlistaclientesPageRoutingModule
  ],
  declarations: [CardlistaclientesPage]
})
export class CardlistaclientesPageModule {}
