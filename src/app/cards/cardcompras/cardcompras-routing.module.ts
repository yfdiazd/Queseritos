import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardcomprasPage } from './cardcompras.page';

const routes: Routes = [
  {
    path: '',
    component: CardcomprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardcomprasPageRoutingModule {}
