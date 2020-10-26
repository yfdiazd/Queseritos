import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarventaPageRoutingModule } from './confirmarventa-routing.module';

import { ConfirmarventaPage } from './confirmarventa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarventaPageRoutingModule
  ],
  declarations: [ConfirmarventaPage]
})
export class ConfirmarventaPageModule {}
