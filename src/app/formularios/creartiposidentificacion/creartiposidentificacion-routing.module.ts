import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreartiposidentificacionPage } from './creartiposidentificacion.page';

const routes: Routes = [
  {
    path: '',
    component: CreartiposidentificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreartiposidentificacionPageRoutingModule {}
