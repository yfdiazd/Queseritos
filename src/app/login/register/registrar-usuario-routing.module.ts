import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarUsuarioPage } from './registrar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarUsuarioPage
  },  {
    path: 'terminos',
    loadChildren: () => import('./terminos/terminos.module').then( m => m.TerminosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarUsuarioPageRoutingModule {}
