import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeestadoquesoPageRoutingModule } from './homeestadoqueso-routing.module';

import { HomeestadoquesoPage } from './homeestadoqueso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeestadoquesoPageRoutingModule
  ],
  declarations: [HomeestadoquesoPage]
})
export class HomeestadoquesoPageModule {}
