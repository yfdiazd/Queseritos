import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallelotePage } from './detallelote.page';

const routes: Routes = [
  {
    path: '',
    component: DetallelotePage
  },  {
    path: 'vistaimg',
    loadChildren: () => import('./vistaimg/vistaimg.module').then( m => m.VistaimgPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallelotePageRoutingModule {}
