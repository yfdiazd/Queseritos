import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpesajecompraPageRoutingModule } from './crearpesajecompra-routing.module';

import { CrearpesajecompraPage } from './crearpesajecompra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpesajecompraPageRoutingModule
  ],
  declarations: [CrearpesajecompraPage]
})
export class CrearpesajecompraPageModule {}
