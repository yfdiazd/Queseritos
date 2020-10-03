import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearciudadPage } from './crearciudad.page';

const routes: Routes = [
  {
    path: '',
    component: CrearciudadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearciudadPageRoutingModule {}
