import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./login/register/registrar-usuario.module').then(m => m.RegistrarUsuarioPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'main-menu', loadChildren: () => import('./main-menu/main-menu.module').then(m => m.MainMenuPageModule) },
  {
    path: 'crearproducto',
    loadChildren: () => import('./formularios/crearproducto/crearproducto.module').then(m => m.CrearproductoPageModule)
  },
  {
    path: 'crearproveedor',
    loadChildren: () => import('./formularios/crearproveedor/crearproveedor.module').then(m => m.CrearproveedorPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./login/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  }, {
    path: 'crearestadoproducto',
    loadChildren: () => import('./formularios/crearestadoproducto/crearestadoproducto.module').then(m => m.CrearestadoproductoPageModule)
  },
  {
    path: 'creartiposanticipo',
    loadChildren: () => import('./formularios/creartiposanticipo/creartiposanticipo.module').then(m => m.CreartiposanticipoPageModule)
  },
  {
    path: 'creartipostrueque',
    loadChildren: () => import('./formularios/creartipostrueque/creartipostrueque.module').then(m => m.CreartipostruequePageModule)
  },
  {
    path: 'crearclientes',
    loadChildren: () => import('./formularios/crearclientes/crearclientes.module').then(m => m.CrearclientesPageModule)
  },
  {
    path: 'creartiposidentificacion',
    loadChildren: () => import('./formularios/creartiposidentificacion/creartiposidentificacion.module').then(m => m.CreartiposidentificacionPageModule)
  },
  {
    path: 'crearciudad',
    loadChildren: () => import('./formularios/crearciudad/crearciudad.module').then(m => m.CrearciudadPageModule)
  },
  {
    path: 'crearconductor',
    loadChildren: () => import('./formularios/crearconductor/crearconductor.module').then(m => m.CrearconductorPageModule)
  },
  {
    path: 'crearanticipos',
    loadChildren: () => import('./formularios/crearanticipos/crearanticipos.module').then(m => m.CrearanticiposPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
