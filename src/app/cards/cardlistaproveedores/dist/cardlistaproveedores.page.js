"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardlistaproveedoresPage = void 0;
var core_1 = require("@angular/core");
var CardlistaproveedoresPage = /** @class */ (function () {
    function CardlistaproveedoresPage(modalCtrl, menu, FB, navCtrl, alertController, router) {
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.FB = FB;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.router = router;
        this.listaprovlote = [];
        this.listanombres = [];
        this.cont = 0;
        this.listarproveedores();
    }
    CardlistaproveedoresPage.prototype.ngOnInit = function () {
    };
    CardlistaproveedoresPage.prototype.listarproveedores = function () {
        var _this = this;
        this.listaprovlote = [];
        this.listanombres = [];
        this.FB.pesajeCompraLista.forEach(function (element) {
            _this.listaprovlote.push({ id: element.idProveedor });
        });
        this.FB.proveedoresLista.forEach(function (element) {
            _this.listaprovlote.forEach(function (element2) {
                console.log("imprime element2", element2);
                if (element.id == element2.id)
                    _this.listanombres.push(element.nombre);
            });
        });
    };
    CardlistaproveedoresPage.prototype.irCardLote = function () {
        this.navCtrl.navigateForward('cardlotes');
    };
    CardlistaproveedoresPage.prototype.reorder = function (event) {
        console.log(event);
        var itemMover = this.listaprovlote.splice(event.detail.from, 1)[0];
        this.listaprovlote.splice(event.detail.to, 0, itemMover);
        event.detail.complete();
    };
    CardlistaproveedoresPage.prototype.buscar = function (ev) {
        this.listanombres;
        var val = ev.target.value;
        if (val && val.trim !== '') {
            this.listanombres = this.listanombres.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    CardlistaproveedoresPage = __decorate([
        core_1.Component({
            selector: 'app-cardlistaproveedores',
            templateUrl: './cardlistaproveedores.page.html',
            styleUrls: ['./cardlistaproveedores.page.scss']
        })
    ], CardlistaproveedoresPage);
    return CardlistaproveedoresPage;
}());
exports.CardlistaproveedoresPage = CardlistaproveedoresPage;
