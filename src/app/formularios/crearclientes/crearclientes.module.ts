import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearclientesPageRoutingModule } from './crearclientes-routing.module';

import { CrearclientesPage } from './crearclientes.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CrearclientesPageRoutingModule
  ],
  declarations: [CrearclientesPage]
})
export class CrearclientesPageModule {}
