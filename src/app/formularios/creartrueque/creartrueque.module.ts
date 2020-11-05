import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
export class CreartruequePageModule { }
