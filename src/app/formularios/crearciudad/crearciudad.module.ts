import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CrearciudadPageRoutingModule } from "./crearciudad-routing.module";

import { CrearciudadPage } from "./crearciudad.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearciudadPageRoutingModule,
  ],
  declarations: [CrearciudadPage],
})
export class CrearciudadPageModule {}
