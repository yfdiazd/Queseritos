import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeciudadesPageRoutingModule } from './homeciudades-routing.module';

import { HomeciudadesPage } from './homeciudades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeciudadesPageRoutingModule
  ],
  declarations: [HomeciudadesPage]
})
export class HomeciudadesPageModule {}
