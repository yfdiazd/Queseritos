import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from '@ionic/angular';
import {jsonlocal} from 'src/assets/js/archjson.js';

import { CreartruequePageRoutingModule } from './creartrueque-routing.module';

import { CreartruequePage } from './creartrueque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreartruequePageRoutingModule,
    HttpClientModule,
    jsonlocal
  ],
  declarations: [CreartruequePage]
})
export class CreartruequePageModule {}
