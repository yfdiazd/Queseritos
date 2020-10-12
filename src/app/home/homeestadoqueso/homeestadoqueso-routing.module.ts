import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeestadoquesoPage } from './homeestadoqueso.page';

const routes: Routes = [
  {
    path: '',
    component: HomeestadoquesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeestadoquesoPageRoutingModule {}
