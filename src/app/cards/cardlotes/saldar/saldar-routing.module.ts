import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaldarPage } from './saldar.page';

const routes: Routes = [
  {
    path: '',
    component: SaldarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldarPageRoutingModule {}
