import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeconductoresPageRoutingModule } from './homeconductores-routing.module';

import { HomeconductoresPage } from './homeconductores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeconductoresPageRoutingModule
  ],
  declarations: [HomeconductoresPage]
})
export class HomeconductoresPageModule {}
