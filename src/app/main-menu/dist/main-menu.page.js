"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainMenuPage = void 0;
var core_1 = require("@angular/core");
// import { HomeciudadesPage } from '../home/homeciudades/homeciudades.page';
// import { HometipotruequePage } from '../home/hometipotrueque/hometipotrueque.page';
// import { HometiposquesoPage } from '../home/hometiposqueso/hometiposqueso.page';
// import { HometiposidentificacionPage } from '../home/hometiposidentificacion/hometiposidentificacion.page';
// import { HometipoanticipoPage } from '../home/hometipoanticipo/hometipoanticipo.page';
// import { HomeproveedoresPage } from '../home/homeproveedores/homeproveedores.page';
// import { HomeestadoquesoPage } from '../home/homeestadoqueso/homeestadoqueso.page';
// import { HomeconductoresPage } from '../home/homeconductores/homeconductores.page';
// import { HomeclientesPage } from '../home/homeclientes/homeclientes.page';
var MainMenuPage = /** @class */ (function () {
    function MainMenuPage(modalCtrl, menu, FB, navCtrl, alertController, router) {
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.FB = FB;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.router = router;
        this.input = { data: [] };
    }
    MainMenuPage.prototype.comprar = function () {
        this.navCtrl.navigateForward('cardcompras');
        this.FB.getProveedorCompra();
        this.FB.getAnticipoProveedor();
    };
    MainMenuPage.prototype.irCardLotes = function () {
        this.navCtrl.navigateForward('cardlistaproveedores');
    };
    MainMenuPage.prototype.lista = function () {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    };
    MainMenuPage.prototype.cerrarSesion = function () {
        this.FB.cerrarSesion();
    };
    //Redireccionamiento a las paginas de configuración
    MainMenuPage.prototype.irCiudad = function () {
        this.navCtrl.navigateForward('homeciudades');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HomeciudadesPage,
        //   cssClass: "my-custom-class"
        // });
        // this.modalCtrl.dismiss();
        // return await modal.present();
    };
    MainMenuPage.prototype.irCliente = function () {
        this.navCtrl.navigateForward('homeclientes');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HomeclientesPage,
        //   cssClass: "my-custom-class"
        // });
        // return await modal.present();
    };
    MainMenuPage.prototype.irConductor = function () {
        this.navCtrl.navigateForward('homeconductores');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HomeconductoresPage,
        //   cssClass: "my-custom-class"
        // });
        // return await modal.present();
    };
    MainMenuPage.prototype.irEstadoQueso = function () {
        this.navCtrl.navigateForward('homeestadoqueso');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HomeestadoquesoPage,
        //   cssClass: "my-custom-class"
        // });
        // return await modal.present();
    };
    MainMenuPage.prototype.irProveedor = function () {
        this.navCtrl.navigateForward('homeproveedores');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HomeproveedoresPage,
        //   cssClass: "my-custom-class"
        // });
        // this.menu.close('first');
        // return await modal.present();
    };
    MainMenuPage.prototype.irTipoAnticipo = function () {
        this.navCtrl.navigateForward('hometipoanticipo');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HometipoanticipoPage,
        //   cssClass: "my-custom-class"
        // });
        // return await modal.present();
    };
    MainMenuPage.prototype.irTipoIdentificacion = function () {
        this.navCtrl.navigateForward('hometiposidentificacion');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HometiposidentificacionPage,
        //   cssClass: "my-custom-class"
        // });
        // return await modal.present();
    };
    MainMenuPage.prototype.irTipoQueso = function () {
        this.navCtrl.navigateForward('hometiposqueso');
        this.menu.enable(true, 'first');
        this.menu.close('first');
        // const modal = await this.modalCtrl.create({
        //   component: HometiposquesoPage,
        //   cssClass: "my-custom-class"
        // });
        // return await modal.present();
    };
    MainMenuPage = __decorate([
        core_1.Component({
            selector: 'app-main-menu',
            templateUrl: './main-menu.page.html',
            styleUrls: ['./main-menu.page.scss']
        })
    ], MainMenuPage);
    return MainMenuPage;
}());
exports.MainMenuPage = MainMenuPage;
