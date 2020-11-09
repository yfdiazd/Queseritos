"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginPageModule; }); } },
    { path: 'register', loadChildren: function () { return Promise.resolve().then(function () { return require('./login/register/registrar-usuario.module'); }).then(function (m) { return m.RegistrarUsuarioPageModule; }); } },
    { path: 'home', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); } },
    { path: 'login', loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginPageModule; }); } },
    { path: 'main-menu', loadChildren: function () { return Promise.resolve().then(function () { return require('./main-menu/main-menu.module'); }).then(function (m) { return m.MainMenuPageModule; }); } },
    { path: 'register', loadChildren: function () { return Promise.resolve().then(function () { return require('./login/register/registrar-usuario.module'); }).then(function (m) { return m.RegistrarUsuarioPageModule; }); } },
    { path: 'crearproducto', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearproducto/crearproducto.module'); }).then(function (m) { return m.CrearproductoPageModule; }); } },
    { path: 'crearproveedor', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearproveedor/crearproveedor.module'); }).then(function (m) { return m.CrearproveedorPageModule; }); } },
    { path: 'recuperar', loadChildren: function () { return Promise.resolve().then(function () { return require('./login/recuperar/recuperar.module'); }).then(function (m) { return m.RecuperarPageModule; }); } }, { path: 'crearestadoproducto', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearestadoproducto/crearestadoproducto.module'); }).then(function (m) { return m.CrearestadoproductoPageModule; }); } },
    { path: 'creartiposanticipo', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/creartiposanticipo/creartiposanticipo.module'); }).then(function (m) { return m.CreartiposanticipoPageModule; }); } },
    { path: 'crearclientes', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearclientes/crearclientes.module'); }).then(function (m) { return m.CrearclientesPageModule; }); } },
    { path: 'creartiposidentificacion', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/creartiposidentificacion/creartiposidentificacion.module'); }).then(function (m) { return m.CreartiposidentificacionPageModule; }); } },
    { path: 'crearciudad', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearciudad/crearciudad.module'); }).then(function (m) { return m.CrearciudadPageModule; }); } },
    { path: 'crearconductor', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearconductor/crearconductor.module'); }).then(function (m) { return m.CrearconductorPageModule; }); } },
    { path: 'creartrueque', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/creartrueque/creartrueque.module'); }).then(function (m) { return m.CreartruequePageModule; }); } },
    { path: 'crearenviocliente/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearenviocliente/crearenviocliente.module'); }).then(function (m) { return m.CrearenvioclientePageModule; }); } },
    { path: 'cardcompras', loadChildren: function () { return Promise.resolve().then(function () { return require('./cards/cardcompras/cardcompras.module'); }).then(function (m) { return m.CardcomprasPageModule; }); } },
    { path: 'confirmarpesaje', loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/confirmarpesaje/confirmarpesaje.module'); }).then(function (m) { return m.ConfirmarpesajePageModule; }); } },
    { path: 'cardcompradetallada/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./cards/cardcompradetallada/cardcompradetallada.module'); }).then(function (m) { return m.CardcompradetalladaPageModule; }); } },
    { path: 'homeclientes', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/homeclientes/homeclientes.module'); }).then(function (m) { return m.HomeclientesPageModule; }); } },
    { path: 'hometiposqueso', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/hometiposqueso/hometiposqueso.module'); }).then(function (m) { return m.HometiposquesoPageModule; }); } },
    { path: 'hometipoanticipo', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/hometipoanticipo/hometipoanticipo.module'); }).then(function (m) { return m.HometipoanticipoPageModule; }); } },
    { path: 'homeestadoqueso', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/homeestadoqueso/homeestadoqueso.module'); }).then(function (m) { return m.HomeestadoquesoPageModule; }); } },
    { path: 'homeciudades', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/homeciudades/homeciudades.module'); }).then(function (m) { return m.HomeciudadesPageModule; }); } },
    { path: 'hometiposidentificacion', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/hometiposidentificacion/hometiposidentificacion.module'); }).then(function (m) { return m.HometiposidentificacionPageModule; }); } },
    { path: 'homeproveedores', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/homeproveedores/homeproveedores.module'); }).then(function (m) { return m.HomeproveedoresPageModule; }); } },
    { path: 'homeconductores', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/homeconductores/homeconductores.module'); }).then(function (m) { return m.HomeconductoresPageModule; }); } },
    { path: 'homepesajes', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/homepesajes/homepesajes.module'); }).then(function (m) { return m.HomepesajesPageModule; }); } },
    { path: 'homeventas', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/homeventas/homeventas.module'); }).then(function (m) { return m.HomeventasPageModule; }); } },
    { path: 'cardlotes/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./cards/cardlotes/cardlotes.module'); }).then(function (m) { return m.CardlotesPageModule; }); } },
    {
        path: 'detallelote/:id/:prov',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/detallelote/detallelote.module'); }).then(function (m) { return m.DetallelotePageModule; }); }
    },
    {
        path: 'cardlistaproveedores',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./cards/cardlistaproveedores/cardlistaproveedores.module'); }).then(function (m) { return m.CardlistaproveedoresPageModule; }); }
    },
    {
        path: 'crearcompra',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearcompra/crearcompra.module'); }).then(function (m) { return m.CrearcompraPageModule; }); }
    },
    {
        path: 'confirmarventa',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/confirmarventa/confirmarventa.module'); }).then(function (m) { return m.ConfirmarventaPageModule; }); }
    },
    {
        path: 'cardlistaclientes',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./cards/cardlistaclientes/cardlistaclientes.module'); }).then(function (m) { return m.CardlistaclientesPageModule; }); }
    },
    {
        path: 'cardventas/:id',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./cards/cardventas/cardventas.module'); }).then(function (m) { return m.CardventasPageModule; }); }
    },
    {
        path: 'crearventa',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./formularios/crearventa/crearventa.module'); }).then(function (m) { return m.CrearventaPageModule; }); }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
