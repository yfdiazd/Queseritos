import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HometipotruequePage } from './hometipotrueque.page';

const routes: Routes = [
  {
    path: '',
    component: HometipotruequePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HometipotruequePageRoutingModule {}
