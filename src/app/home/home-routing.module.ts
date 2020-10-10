import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },  {
    path: 'homeclientes',
    loadChildren: () => import('./homeclientes/homeclientes.module').then( m => m.HomeclientesPageModule)
  },
  {
    path: 'hometiposqueso',
    loadChildren: () => import('./hometiposqueso/hometiposqueso.module').then( m => m.HometiposquesoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
