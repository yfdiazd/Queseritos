import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreartruequePageRoutingModule } from './creartrueque-routing.module';

import { CreartruequePage } from './creartrueque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreartruequePageRoutingModule
  ],
  declarations: [CreartruequePage]
})
export class CreartruequePageModule {}
