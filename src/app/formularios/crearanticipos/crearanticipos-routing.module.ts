import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearanticiposPage } from './crearanticipos.page';

const routes: Routes = [
  {
    path: '',
    component: CrearanticiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearanticiposPageRoutingModule {}
