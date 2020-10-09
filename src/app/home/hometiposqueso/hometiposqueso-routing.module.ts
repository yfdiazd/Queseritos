import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HometiposquesoPage } from './hometiposqueso.page';

const routes: Routes = [
  {
    path: '',
    component: HometiposquesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HometiposquesoPageRoutingModule {}
