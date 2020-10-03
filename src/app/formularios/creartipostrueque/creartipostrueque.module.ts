import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreartipostruequePageRoutingModule } from './creartipostrueque-routing.module';

import { CreartipostruequePage } from './creartipostrueque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreartipostruequePageRoutingModule
  ],
  declarations: [CreartipostruequePage]
})
export class CreartipostruequePageModule {}
