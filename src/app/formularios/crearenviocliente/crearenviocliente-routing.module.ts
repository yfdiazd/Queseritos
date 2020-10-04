import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearenvioclientePage } from './crearenviocliente.page';

const routes: Routes = [
  {
    path: '',
    component: CrearenvioclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearenvioclientePageRoutingModule {}
