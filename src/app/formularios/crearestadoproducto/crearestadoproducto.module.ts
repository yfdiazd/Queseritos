import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearestadoproductoPageRoutingModule } from './crearestadoproducto-routing.module';

import { CrearestadoproductoPage } from './crearestadoproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearestadoproductoPageRoutingModule
  ],
  declarations: [CrearestadoproductoPage]
})
export class CrearestadoproductoPageModule {}
