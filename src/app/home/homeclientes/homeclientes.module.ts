import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeclientesPageRoutingModule } from './homeclientes-routing.module';

import { HomeclientesPage } from './homeclientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeclientesPageRoutingModule
  ],
  declarations: [HomeclientesPage]
})
export class HomeclientesPageModule {}
