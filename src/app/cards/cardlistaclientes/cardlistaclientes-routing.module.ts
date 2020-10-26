import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardlistaclientesPage } from './cardlistaclientes.page';

const routes: Routes = [
  {
    path: '',
    component: CardlistaclientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardlistaclientesPageRoutingModule {}
