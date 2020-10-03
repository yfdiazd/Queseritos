import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearproductoPageRoutingModule } from './crearproducto-routing.module';

import { CrearproductoPage } from './crearproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearproductoPageRoutingModule
  ],
  declarations: [CrearproductoPage]
})
export class CrearproductoPageModule {}
