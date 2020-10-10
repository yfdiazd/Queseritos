import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeproveedoresPageRoutingModule } from './homeproveedores-routing.module';

import { HomeproveedoresPage } from './homeproveedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeproveedoresPageRoutingModule
  ],
  declarations: [HomeproveedoresPage]
})
export class HomeproveedoresPageModule {}
