import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreartiposidentificacionPageRoutingModule } from './creartiposidentificacion-routing.module';

import { CreartiposidentificacionPage } from './creartiposidentificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreartiposidentificacionPageRoutingModule
  ],
  declarations: [CreartiposidentificacionPage]
})
export class CreartiposidentificacionPageModule {}
