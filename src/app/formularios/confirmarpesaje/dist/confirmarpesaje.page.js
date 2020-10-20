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
    function ConfirmarpesajePage(FB) {
        this.FB = FB;
        this.cantidadEstado = 0;
        this.costoKilo = 0;
        this.calculaCostoTotal = 0;
        this.listaBultos = ["1"];
        this.total = 0;
        this.valor = 0;
        //variables dummy 
        this.proveedor = "fernanda";
        this.fechcompra = "05-10-2020";
        this.estadoqueso = "Borona";
        this.estadoqueso1 = "Normal";
        this.tipqueso = "Costeño";
        this.totalbultos = 30;
        this.pesototal = 1000;
    }
    ConfirmarpesajePage.prototype.ngOnInit = function () {
        this.FB.verificarsesion();
    };
    ConfirmarpesajePage.prototype.confirmar = function () {
        this.listaBultos.push("");
        this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
        // this.FB.agregarConfirmaPesaje("1234", this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
        this.sumaCostoTotal();
    };
    ConfirmarpesajePage.prototype.guardar = function () {
        this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
        // this.FB.agregarConfirmaPesaje( "1234", this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
        this.sumaCostoTotal();
    };
    ConfirmarpesajePage.prototype.calcular = function (valor) {
        this.total = (valor * this.cantidadEstado);
        console.log("imprime valor", valor, this.total);
    };
    ConfirmarpesajePage.prototype.eliminarBulto = function () {
    };
    ConfirmarpesajePage.prototype.editarBulto = function () {
    };
    // guardarPesajeConfirmado() {
    //   this.FB.getPesajeCompra();
    //   this.idPesajeCompra = "1602531822105";
    //   this.idEstadoProducto = "1602459210154";
    //   this.cantidadEstado = "50";
    //   this.costoKilo = "6500";
    //   this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    //   console.log("Compramossss " + this.costoTotalEstado);
    //   this.sumaCostoTotal();
    //   //this.FB.agregarConfirmaPesaje(this.idPesajeCompra, this.idproveedor, this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
    // }
    ConfirmarpesajePage.prototype.sumaCostoTotal = function () {
        var _this = this;
        console.log("Ejecucion del metttt " + this.FB.pesajeCompraLista.length);
        this.FB.pesajeCompraLista.forEach(function (element) {
            if (element.id == "1602537527210") {
                console.log("Vallllll " + element.costoTotalCompra);
                _this.calculaCostoTotal = (element.costoTotalCompra + _this.costoTotalEstado);
                console.log("Sumaaaaaa " + _this.calculaCostoTotal);
                //updateeeeee
                // this.FB.updatePesajeCompra("1602537527210", this.calculaCostoTotal);
            }
        });
    };
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
