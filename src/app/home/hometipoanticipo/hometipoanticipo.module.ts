import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HometipoanticipoPageRoutingModule } from './hometipoanticipo-routing.module';

import { HometipoanticipoPage } from './hometipoanticipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HometipoanticipoPageRoutingModule
  ],
  declarations: [HometipoanticipoPage]
})
export class HometipoanticipoPageModule {}
