import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeciudadesPage } from './homeciudades.page';

const routes: Routes = [
  {
    path: '',
    component: HomeciudadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeciudadesPageRoutingModule {}
