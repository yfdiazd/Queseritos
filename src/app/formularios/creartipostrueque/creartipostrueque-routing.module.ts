import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreartipostruequePage } from './creartipostrueque.page';

const routes: Routes = [
  {
    path: '',
    component: CreartipostruequePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreartipostruequePageRoutingModule {}
