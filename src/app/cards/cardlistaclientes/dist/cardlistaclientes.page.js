"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardlistaclientesPage = void 0;
var core_1 = require("@angular/core");
var CardlistaclientesPage = /** @class */ (function () {
    function CardlistaclientesPage(modalCtrl, menu, FB, navCtrl, alertController, route) {
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.FB = FB;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.route = route;
        this.listanombres = [];
        this.cont = 0;
        this.listarnombresclientes();
    }
    CardlistaclientesPage.prototype.ngOnInit = function () {
        this.lastLote = "";
        this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1).toString());
    };
    CardlistaclientesPage.prototype.getItems = function (ev) {
        this.listanombres;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.listanombres = this.listanombres.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            if (val == '' || val == undefined) {
                return this.listarnombresclientes();
            }
        }
    };
    CardlistaclientesPage.prototype.listarnombresclientes = function () {
        var _this = this;
        this.listanombres = [];
        this.FB.clientesLista.forEach(function (element) {
            _this.listanombres.push((element.nombres + " " + element.apellidos));
        });
        return this.listanombres;
    };
    CardlistaclientesPage.prototype.irCardListaClientes = function (input) {
        var _this = this;
        this.FB.clientesLista.forEach(function (element) {
            if (element.nombres + " " + element.apellidos == input) {
                _this.FB.getVentaCliente(element.id);
                _this.FB.getVentaClienteMes(element.id);
                _this.navCtrl.navigateForward(['cardventas/', element.id]);
            }
        });
    };
    CardlistaclientesPage.prototype.irInicio = function () {
        this.navCtrl.navigateBack(["main-menu"]);
    };
    CardlistaclientesPage.prototype.irCompras = function () {
        this.FB.getProveedorCompra(this.lastLote);
        this.FB.getAnticipoProveedor(this.lastLote);
        this.navCtrl.navigateBack(["cardcompras"]);
    };
    CardlistaclientesPage.prototype.irEstado = function () {
        this.navCtrl.navigateBack(["cardlistaproveedores"]);
    };
    CardlistaclientesPage = __decorate([
        core_1.Component({
            selector: 'app-cardlistaclientes',
            templateUrl: './cardlistaclientes.page.html',
            styleUrls: ['./cardlistaclientes.page.scss']
        })
    ], CardlistaclientesPage);
    return CardlistaclientesPage;
}());
exports.CardlistaclientesPage = CardlistaclientesPage;
