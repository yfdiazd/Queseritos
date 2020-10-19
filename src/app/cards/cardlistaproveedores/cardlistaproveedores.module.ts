import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardlistaproveedoresPageRoutingModule } from './cardlistaproveedores-routing.module';

import { CardlistaproveedoresPage } from './cardlistaproveedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardlistaproveedoresPageRoutingModule
  ],
  declarations: [CardlistaproveedoresPage]
})
export class CardlistaproveedoresPageModule {}
