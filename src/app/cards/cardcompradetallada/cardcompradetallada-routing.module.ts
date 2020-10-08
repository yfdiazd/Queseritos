import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardcompradetalladaPage } from './cardcompradetallada.page';

const routes: Routes = [
  {
    path: '',
    component: CardcompradetalladaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardcompradetalladaPageRoutingModule {}
