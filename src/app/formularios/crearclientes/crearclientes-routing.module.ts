import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearclientesPage } from './crearclientes.page';

const routes: Routes = [
  {
    path: '',
    component: CrearclientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearclientesPageRoutingModule {}
