import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarvalorventaPage } from './agregarvalorventa.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarvalorventaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarvalorventaPageRoutingModule {}
