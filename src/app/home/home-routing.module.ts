import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'homeclientes',
    loadChildren: () => import('./homeclientes/homeclientes.module').then( m => m.HomeclientesPageModule)
  },
  {
    path: 'hometiposqueso',
    loadChildren: () => import('./hometiposqueso/hometiposqueso.module').then( m => m.HometiposquesoPageModule)
  },
  {
    path: 'hometipoanticipo',
    loadChildren: () => import('./hometipoanticipo/hometipoanticipo.module').then( m => m.HometipoanticipoPageModule)
  },
  {
    path: 'homeestadoqueso',
    loadChildren: () => import('./homeestadoqueso/homeestadoqueso.module').then( m => m.HomeestadoquesoPageModule)
  },
  {
    path: 'hometipotrueque',
    loadChildren: () => import('./hometipotrueque/hometipotrueque.module').then( m => m.HometipotruequePageModule)
  },
  {
    path: 'homeciudades',
    loadChildren: () => import('./homeciudades/homeciudades.module').then( m => m.HomeciudadesPageModule)
  },
  {
    path: 'hometiposidentificacion',
    loadChildren: () => import('./hometiposidentificacion/hometiposidentificacion.module').then( m => m.HometiposidentificacionPageModule)
  },
  {
    path: 'homeproveedores',
    loadChildren: () => import('./homeproveedores/homeproveedores.module').then( m => m.HomeproveedoresPageModule)
  },
  {
    path: 'homeconductores',
    loadChildren: () => import('./homeconductores/homeconductores.module').then( m => m.HomeconductoresPageModule)
  },  {
    path: 'homepesajes',
    loadChildren: () => import('./homepesajes/homepesajes.module').then( m => m.HomepesajesPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
