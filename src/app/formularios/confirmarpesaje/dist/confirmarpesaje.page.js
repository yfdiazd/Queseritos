"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfirmarpesajePage = void 0;
var core_1 = require("@angular/core");
var ConfirmarpesajePage = /** @class */ (function () {
    function ConfirmarpesajePage(FB, HP, popover) {
        this.FB = FB;
        this.HP = HP;
        this.popover = popover;
        this.cantidadEstado = 0;
        this.costoKilo = 0;
        this.calculaCostoTotal = 0;
        this.listaBultos = ["1"];
        this.total = 0;
        this.valor = 0;
        this.sumado = 0;
        this.objCompreDetallada = [];
    }
    ConfirmarpesajePage.prototype.ngOnInit = function () {
    };
    ConfirmarpesajePage.prototype.guardar = function () {
        this.objCompreDetallada = null;
        this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
        this.objCompreDetallada = ({
            idProv: this.idProv,
            idCompra: this.idCompra,
            idEstProd: this.idEstadoProducto,
            peso: this.cantidadEstado,
            costKilo: this.costoKilo,
            costTotal: this.costoTotalEstado
        });
        console.log("lista tiene  ", this.objCompreDetallada);
        this.popover.dismiss(this.objCompreDetallada, "pesajeConfirmado");
    };
    ConfirmarpesajePage.prototype.calcular = function (valor) {
        this.total = (valor * this.cantidadEstado);
        console.log("imprime valor", valor, this.total);
    };
    __decorate([
        core_1.Input()
    ], ConfirmarpesajePage.prototype, "id");
    __decorate([
        core_1.Input()
    ], ConfirmarpesajePage.prototype, "idCompra");
    __decorate([
        core_1.Input()
    ], ConfirmarpesajePage.prototype, "idProv");
    ConfirmarpesajePage = __decorate([
        core_1.Component({
            selector: 'app-confirmarpesaje',
            templateUrl: './confirmarpesaje.page.html',
            styleUrls: ['./confirmarpesaje.page.scss']
        })
    ], ConfirmarpesajePage);
    return ConfirmarpesajePage;
}());
exports.ConfirmarpesajePage = ConfirmarpesajePage;
