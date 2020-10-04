import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearanticiposPageRoutingModule } from './crearanticipos-routing.module';

import { CrearanticiposPage } from './crearanticipos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearanticiposPageRoutingModule
  ],
  declarations: [CrearanticiposPage]
})
export class CrearanticiposPageModule {}
