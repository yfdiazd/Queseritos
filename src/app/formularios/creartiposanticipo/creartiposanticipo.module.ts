import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreartiposanticipoPageRoutingModule } from './creartiposanticipo-routing.module';

import { CreartiposanticipoPage } from './creartiposanticipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreartiposanticipoPageRoutingModule
  ],
  declarations: [CreartiposanticipoPage]
})
export class CreartiposanticipoPageModule {}
