import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepesajesPage } from './homepesajes.page';

const routes: Routes = [
  {
    path: '',
    component: HomepesajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepesajesPageRoutingModule {}
