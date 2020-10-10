import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HometiposidentificacionPage } from './hometiposidentificacion.page';

const routes: Routes = [
  {
    path: '',
    component: HometiposidentificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HometiposidentificacionPageRoutingModule {}
