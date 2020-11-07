import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearventaPage } from './crearventa.page';

const routes: Routes = [
  {
    path: '',
    component: CrearventaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearventaPageRoutingModule {}
