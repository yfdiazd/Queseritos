import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearconductorPage } from './crearconductor.page';

const routes: Routes = [
  {
    path: '',
    component: CrearconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearconductorPageRoutingModule {}
