import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HometipotruequePageRoutingModule } from './hometipotrueque-routing.module';

import { HometipotruequePage } from './hometipotrueque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HometipotruequePageRoutingModule
  ],
  declarations: [HometipotruequePage]
})
export class HometipotruequePageModule {}
