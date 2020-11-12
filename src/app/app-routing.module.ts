import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./login/register/registrar-usuario.module').then(m => m.RegistrarUsuarioPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'main-menu', loadChildren: () => import('./main-menu/main-menu.module').then(m => m.MainMenuPageModule) },
  { path: 'register', loadChildren: () => import('./login/register/registrar-usuario.module').then(m => m.RegistrarUsuarioPageModule) },
  { path: 'crearproducto', loadChildren: () => import('./formularios/crearproducto/crearproducto.module').then(m => m.CrearproductoPageModule) },
  { path: 'crearproveedor', loadChildren: () => import('./formularios/crearproveedor/crearproveedor.module').then(m => m.CrearproveedorPageModule) },
  { path: 'recuperar', loadChildren: () => import('./login/recuperar/recuperar.module').then(m => m.RecuperarPageModule) }, { path: 'crearestadoproducto', loadChildren: () => import('./formularios/crearestadoproducto/crearestadoproducto.module').then(m => m.CrearestadoproductoPageModule) },
  { path: 'creartiposanticipo', loadChildren: () => import('./formularios/creartiposanticipo/creartiposanticipo.module').then(m => m.CreartiposanticipoPageModule) },
  { path: 'crearclientes', loadChildren: () => import('./formularios/crearclientes/crearclientes.module').then(m => m.CrearclientesPageModule) },
  { path: 'creartiposidentificacion', loadChildren: () => import('./formularios/creartiposidentificacion/creartiposidentificacion.module').then(m => m.CreartiposidentificacionPageModule) },
  { path: 'crearciudad', loadChildren: () => import('./formularios/crearciudad/crearciudad.module').then(m => m.CrearciudadPageModule) },
  { path: 'crearconductor', loadChildren: () => import('./formularios/crearconductor/crearconductor.module').then(m => m.CrearconductorPageModule) },
  { path: 'creartrueque', loadChildren: () => import('./formularios/creartrueque/creartrueque.module').then(m => m.CreartruequePageModule) },
  { path: 'crearenviocliente/:id', loadChildren: () => import('./formularios/crearenviocliente/crearenviocliente.module').then(m => m.CrearenvioclientePageModule) },
  { path: 'cardcompras', loadChildren: () => import('./cards/cardcompras/cardcompras.module').then(m => m.CardcomprasPageModule) },
  { path: 'confirmarpesaje', loadChildren: () => import('./formularios/confirmarpesaje/confirmarpesaje.module').then(m => m.ConfirmarpesajePageModule) },
  { path: 'cardcompradetallada/:id', loadChildren: () => import('./cards/cardcompradetallada/cardcompradetallada.module').then(m => m.CardcompradetalladaPageModule) },
  { path: 'homeclientes', loadChildren: () => import('./home/homeclientes/homeclientes.module').then(m => m.HomeclientesPageModule) },
  { path: 'hometiposqueso', loadChildren: () => import('./home/hometiposqueso/hometiposqueso.module').then(m => m.HometiposquesoPageModule) },
  { path: 'hometipoanticipo', loadChildren: () => import('./home/hometipoanticipo/hometipoanticipo.module').then(m => m.HometipoanticipoPageModule) },
  { path: 'homeestadoqueso', loadChildren: () => import('./home/homeestadoqueso/homeestadoqueso.module').then(m => m.HomeestadoquesoPageModule) },
  { path: 'homeciudades', loadChildren: () => import('./home/homeciudades/homeciudades.module').then(m => m.HomeciudadesPageModule) },
  { path: 'hometiposidentificacion', loadChildren: () => import('./home/hometiposidentificacion/hometiposidentificacion.module').then(m => m.HometiposidentificacionPageModule) },
  { path: 'homeproveedores', loadChildren: () => import('./home/homeproveedores/homeproveedores.module').then(m => m.HomeproveedoresPageModule) },
  { path: 'homeconductores', loadChildren: () => import('./home/homeconductores/homeconductores.module').then(m => m.HomeconductoresPageModule) },
  { path: 'homepesajes', loadChildren: () => import('./home/homepesajes/homepesajes.module').then(m => m.HomepesajesPageModule) },
  { path: 'homeventas', loadChildren: () => import('./home/homeventas/homeventas.module').then(m => m.HomeventasPageModule)},
  { path: 'cardlotes/:id', loadChildren: () => import('./cards/cardlotes/cardlotes.module').then(m => m.CardlotesPageModule) },
  {
    path: 'detallelote/:id/:prov',
    loadChildren: () => import('./formularios/detallelote/detallelote.module').then(m => m.DetallelotePageModule)
  },
  {
    path: 'cardlistaproveedores',
    loadChildren: () => import('./cards/cardlistaproveedores/cardlistaproveedores.module').then(m => m.CardlistaproveedoresPageModule)
  },
  {
    path: 'crearcompra',
    loadChildren: () => import('./formularios/crearcompra/crearcompra.module').then(m => m.CrearcompraPageModule)
  },
  {
    path: 'confirmarventa',
    loadChildren: () => import('./formularios/confirmarventa/confirmarventa.module').then(m => m.ConfirmarventaPageModule)
  },
  {
    path: 'cardlistaclientes',
    loadChildren: () => import('./cards/cardlistaclientes/cardlistaclientes.module').then(m => m.CardlistaclientesPageModule)
  },
  {
    path: 'cardventas/:id',
    loadChildren: () => import('./cards/cardventas/cardventas.module').then( m => m.CardventasPageModule)
  },
  {
    path: 'crearventa',
    loadChildren: () => import('./formularios/crearventa/crearventa.module').then( m => m.CrearventaPageModule)
  },
  {
    path:'terminos',
    loadChildren: () =>import('./login/register/terminos/terminos.module').then(m => m.TerminosPageModule )
  }









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
