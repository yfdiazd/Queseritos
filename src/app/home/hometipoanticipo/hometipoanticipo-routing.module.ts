import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HometipoanticipoPage } from './hometipoanticipo.page';

const routes: Routes = [
  {
    path: '',
    component: HometipoanticipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HometipoanticipoPageRoutingModule {}
