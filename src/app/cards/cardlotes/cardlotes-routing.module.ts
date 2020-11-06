import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardlotesPage } from './cardlotes.page';

const routes: Routes = [
  {
    path: '',
    component: CardlotesPage
  },  {
    path: 'saldar',
    loadChildren: () => import('./saldar/saldar.module').then( m => m.SaldarPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardlotesPageRoutingModule {}
