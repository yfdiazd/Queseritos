import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearenvioclientePage } from './crearenviocliente.page';

const routes: Routes = [
  {
    path: '',
    component: CrearenvioclientePage
  },  {
    path: 'agregarvalorventa',
    loadChildren: () => import('./agregarvalorventa/agregarvalorventa.module').then( m => m.AgregarvalorventaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearenvioclientePageRoutingModule {}
