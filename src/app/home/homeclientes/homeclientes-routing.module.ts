import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeclientesPage } from './homeclientes.page';

const routes: Routes = [
  {
    path: '',
    component: HomeclientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeclientesPageRoutingModule {}
