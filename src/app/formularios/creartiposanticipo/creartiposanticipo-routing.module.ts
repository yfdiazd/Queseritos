import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreartiposanticipoPage } from './creartiposanticipo.page';

const routes: Routes = [
  {
    path: '',
    component: CreartiposanticipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreartiposanticipoPageRoutingModule {}
