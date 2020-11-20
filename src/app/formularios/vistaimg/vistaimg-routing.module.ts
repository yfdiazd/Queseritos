import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaimgPage } from './vistaimg.page';

const routes: Routes = [
  {
    path: '',
    component: VistaimgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaimgPageRoutingModule {}
