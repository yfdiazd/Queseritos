import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaimgPageRoutingModule } from './vistaimg-routing.module';

import { VistaimgPage } from './vistaimg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaimgPageRoutingModule
  ],
  declarations: [VistaimgPage]
})
export class VistaimgPageModule {}
