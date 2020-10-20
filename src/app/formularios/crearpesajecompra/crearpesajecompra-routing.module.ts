import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearpesajecompraPage } from './crearpesajecompra.page';

const routes: Routes = [
  {
    path: '',
    component: CrearpesajecompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearpesajecompraPageRoutingModule {}
