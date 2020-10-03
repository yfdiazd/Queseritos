import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearestadoproductoPage } from './crearestadoproducto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearestadoproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearestadoproductoPageRoutingModule {}
