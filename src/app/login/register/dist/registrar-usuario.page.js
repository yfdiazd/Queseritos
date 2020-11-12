"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistrarUsuarioPage = void 0;
var core_1 = require("@angular/core");
var RegistrarUsuarioPage = /** @class */ (function () {
    function RegistrarUsuarioPage(alertController, FB, toastController, navCtrl) {
        this.alertController = alertController;
        this.FB = FB;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
    }
    RegistrarUsuarioPage.prototype.crearUsuario = function () {
        this.FB.crearUsuario(this.email, this.password, this.user, this.password2);
    };
    RegistrarUsuarioPage.prototype.irTerminos = function () {
        this.navCtrl.navigateForward(["terminos"]);
    };
    RegistrarUsuarioPage = __decorate([
        core_1.Component({
            selector: 'app-registrar-usuario',
            templateUrl: './registrar-usuario.page.html',
            styleUrls: ['./registrar-usuario.page.scss']
        })
    ], RegistrarUsuarioPage);
    return RegistrarUsuarioPage;
}());
exports.RegistrarUsuarioPage = RegistrarUsuarioPage;
