import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarvalorventaPageRoutingModule } from './agregarvalorventa-routing.module';

import { AgregarvalorventaPage } from './agregarvalorventa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarvalorventaPageRoutingModule
  ],
  declarations: [AgregarvalorventaPage]
})
export class AgregarvalorventaPageModule {}
