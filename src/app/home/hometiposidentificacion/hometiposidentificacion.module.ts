import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HometiposidentificacionPageRoutingModule } from './hometiposidentificacion-routing.module';

import { HometiposidentificacionPage } from './hometiposidentificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HometiposidentificacionPageRoutingModule
  ],
  declarations: [HometiposidentificacionPage]
})
export class HometiposidentificacionPageModule {}
