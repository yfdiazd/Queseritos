"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TerminosPage = void 0;
var core_1 = require("@angular/core");
var TerminosPage = /** @class */ (function () {
    function TerminosPage(modalCtrl, modalController, navCtrl) {
        this.modalCtrl = modalCtrl;
        this.modalController = modalController;
        this.navCtrl = navCtrl;
    }
    TerminosPage.prototype.ngOnInit = function () {
    };
    TerminosPage.prototype.volver = function () {
        this.navCtrl.navigateBack(["registrar-usuario"]);
    };
    TerminosPage = __decorate([
        core_1.Component({
            selector: 'app-terminos',
            templateUrl: './terminos.page.html',
            styleUrls: ['./terminos.page.scss']
        })
    ], TerminosPage);
    return TerminosPage;
}());
exports.TerminosPage = TerminosPage;
