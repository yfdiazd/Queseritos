import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeventasPage } from './homeventas.page';

const routes: Routes = [
  {
    path: '',
    component: HomeventasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeventasPageRoutingModule {}
