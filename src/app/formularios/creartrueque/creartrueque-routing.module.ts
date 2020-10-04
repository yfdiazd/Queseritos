import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreartruequePage } from './creartrueque.page';

const routes: Routes = [
  {
    path: '',
    component: CreartruequePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreartruequePageRoutingModule {}
