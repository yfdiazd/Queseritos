import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login',loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)},
  { path: 'main-menu', loadChildren: () => import('./main-menu/main-menu.module').then(m => m.MainMenuPageModule)},
  { path: 'register', loadChildren:() => import('./login/register/registrar-usuario.module').then(m=> m.RegistrarUsuarioPageModule)},  {
    path: 'crearproducto',
    loadChildren: () => import('./formularios/crearproducto/crearproducto.module').then( m => m.CrearproductoPageModule)
  },
  {
    path: 'crearproveedor',
    loadChildren: () => import('./formularios/crearproveedor/crearproveedor.module').then( m => m.CrearproveedorPageModule)
  }

  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
