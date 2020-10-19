import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardlistaproveedoresPage } from './cardlistaproveedores.page';

const routes: Routes = [
  {
    path: '',
    component: CardlistaproveedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardlistaproveedoresPageRoutingModule {}
