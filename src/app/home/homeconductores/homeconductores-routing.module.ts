import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeconductoresPage } from './homeconductores.page';

const routes: Routes = [
  {
    path: '',
    component: HomeconductoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeconductoresPageRoutingModule {}
