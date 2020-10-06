import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarpesajePage } from './confirmarpesaje.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarpesajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarpesajePageRoutingModule {}
