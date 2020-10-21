import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarventaPage } from './confirmarventa.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarventaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarventaPageRoutingModule {}
