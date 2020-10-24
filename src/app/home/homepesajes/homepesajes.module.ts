import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepesajesPageRoutingModule } from './homepesajes-routing.module';

import { HomepesajesPage } from './homepesajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepesajesPageRoutingModule
  ],
  declarations: [HomepesajesPage]
})
export class HomepesajesPageModule {}
