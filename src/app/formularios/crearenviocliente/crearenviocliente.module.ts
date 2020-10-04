import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearenvioclientePageRoutingModule } from './crearenviocliente-routing.module';

import { CrearenvioclientePage } from './crearenviocliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearenvioclientePageRoutingModule
  ],
  declarations: [CrearenvioclientePage]
})
export class CrearenvioclientePageModule {}
