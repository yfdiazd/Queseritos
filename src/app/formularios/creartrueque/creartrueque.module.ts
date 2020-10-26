import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from '@ionic/angular';

import { CreartruequePageRoutingModule } from './creartrueque-routing.module';

import { CreartruequePage } from './creartrueque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreartruequePageRoutingModule,
    HttpClientModule
  ],
  declarations: [CreartruequePage]
})
export class CreartruequePageModule {}
