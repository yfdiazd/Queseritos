import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeventasPageRoutingModule } from './homeventas-routing.module';

import { HomeventasPage } from './homeventas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeventasPageRoutingModule
  ],
  declarations: [HomeventasPage]
})
export class HomeventasPageModule {}
