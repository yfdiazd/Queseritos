"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MainMenuPage = void 0;
var core_1 = require("@angular/core");
var MainMenuPage = /** @class */ (function () {
    function MainMenuPage(modalCtrl, menu, FB, navCtrl, alertController, router, loadingCtrl) {
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.FB = FB;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.input = { data: [] };
        this.lastLote = [];
    }
    MainMenuPage.prototype.ngOnInit = function () {
        var _this = this;
        this.presentLoading('Espere...');
        // this.FB.getTodo();
        setTimeout(function () {
            _this.loading.dismiss();
        }, 1500);
    };
    MainMenuPage.prototype.comprar = function () {
        var lote = this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1).toString();
        this.FB.getProveedorCompra(lote);
        this.FB.getAnticipoProveedor(lote);
        this.navCtrl.navigateForward('cardcompras');
    };
    MainMenuPage.prototype.presentLoading = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: message,
                                cssClass: 'cssLoading',
                                keyboardClose: false,
                                backdropDismiss: true,
                                spinner: 'lines',
                                translucent: true
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [2 /*return*/, this.loading.present()];
                }
            });
        });
    };
    MainMenuPage.prototype.irCardLotes = function () {
        this.navCtrl.navigateForward(["cardlistaproveedores"]);
    };
    MainMenuPage.prototype.irCardListaClientes = function () {
        this.navCtrl.navigateForward(["cardlistaclientes"]);
    };
    MainMenuPage.prototype.irCardListaProveedores = function () {
        // this.FB.getTodo();
        this.FB.getProveedores();
        this.navCtrl.navigateForward(["cardlistaproveedores"]);
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
