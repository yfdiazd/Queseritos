import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CrearventaPageRoutingModule } from './crearventa-routing.module';
import { CrearventaPage } from './crearventa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearventaPageRoutingModule
  ],
  declarations: [CrearventaPage]
})
export class CrearventaPageModule {}
