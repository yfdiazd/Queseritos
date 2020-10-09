import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HometiposquesoPageRoutingModule } from './hometiposqueso-routing.module';

import { HometiposquesoPage } from './hometiposqueso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HometiposquesoPageRoutingModule
  ],
  declarations: [HometiposquesoPage]
})
export class HometiposquesoPageModule {}
