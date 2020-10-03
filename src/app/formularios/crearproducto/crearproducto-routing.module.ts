import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearproductoPage } from './crearproducto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearproductoPageRoutingModule {}
