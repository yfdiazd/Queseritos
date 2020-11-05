import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
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
   declarations: [CreartruequePage],
   providers: [CurrencyPipe]
})
export class CreartruequePageModule {}
