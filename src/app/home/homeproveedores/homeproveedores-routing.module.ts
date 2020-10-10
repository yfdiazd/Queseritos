import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeproveedoresPage } from './homeproveedores.page';

const routes: Routes = [
  {
    path: '',
    component: HomeproveedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeproveedoresPageRoutingModule {}
