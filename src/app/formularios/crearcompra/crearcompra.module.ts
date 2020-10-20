import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearcompraPageRoutingModule } from './crearcompra-routing.module';

import { CrearcompraPage } from './crearcompra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearcompraPageRoutingModule
  ],
  declarations: [CrearcompraPage]
})
export class CrearcompraPageModule {}
