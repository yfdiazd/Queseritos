import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardventasPage } from './cardventas.page';

const routes: Routes = [
  {
    path: '',
    component: CardventasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardventasPageRoutingModule {}
