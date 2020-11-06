import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaldarPageRoutingModule } from './saldar-routing.module';

import { SaldarPage } from './saldar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaldarPageRoutingModule
  ],
  declarations: [SaldarPage]
})
export class SaldarPageModule {}
