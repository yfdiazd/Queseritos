import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, FormArray} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpesajecompraPageRoutingModule } from './crearpesajecompra-routing.module';

import { CrearpesajecompraPage } from './crearpesajecompra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormBuilder,
    ReactiveFormsModule,
    CrearpesajecompraPageRoutingModule
  ],
  declarations: [CrearpesajecompraPage]
})
export class CrearpesajecompraPageModule {}
