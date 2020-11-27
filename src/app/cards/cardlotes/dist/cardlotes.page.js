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
exports.CardlotesPage = void 0;
var core_1 = require("@angular/core");
var saldar_page_1 = require("./saldar/saldar.page");
var CardlotesPage = /** @class */ (function () {
    function CardlotesPage(route, FB, alertController, modalCtrl, navCtrl, loadingCtrl) {
        this.route = route;
        this.FB = FB;
        this.alertController = alertController;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    CardlotesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.presentLoading('Espere...');
        var id = this.route.snapshot.paramMap.get("id");
        this.idProveedorRecibido = id;
        this.lastLote = "";
        this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1).toString());
        this.FB.getProductos();
        this.FB.getLotesDelProveedor(this.idProveedorRecibido);
        this.traerNombre();
        this.estadoGeneral();
        this.validarSaldo();
        this.FB.getEstadoProveedor(this.idProveedorRecibido);
        this.ultimoSaldo = this.FB.estadoSaldoProveedor;
        setTimeout(function () {
            _this.loading.dismiss();
        }, 1500);
    };
    CardlotesPage.prototype.presentLoading = function (message) {
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
                                backdropDismiss: false,
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
    CardlotesPage.prototype.doRefresh = function (event) {
        this.ngOnInit();
        setTimeout(function () {
            event.target.complete();
        }, 1000);
    };
    CardlotesPage.prototype.validarSaldo = function () {
        if (this.saldoGeneral < 0) {
            document.getElementById("saldo").style.color = "red";
        }
        else {
            document.getElementById("saldo").style.color = "lime";
        }
    };
    CardlotesPage.prototype.traerNombre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.nombreProv = [];
                this.FB.proveedoresLista.forEach(function (element) {
                    if (element.id == _this.idProveedorRecibido) {
                        _this.nombreProv = element.nombre + " " + element.apellido;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CardlotesPage.prototype.irDetalleLote = function (item) {
        this.FB.getPesajeLoteProveedor(this.idProveedorRecibido, item.lote);
        this.FB.getAnticipoDirectoProveedor(this.idProveedorRecibido, item.lote);
        this.FB.getPesajeCompra(this.idProveedorRecibido, item.lote);
        this.navCtrl.navigateForward(["detallelote/", item.lote, this.idProveedorRecibido]);
    };
    CardlotesPage.prototype.irInicio = function () {
        this.navCtrl.navigateBack(["main-menu"]);
    };
    CardlotesPage.prototype.irCompras = function () {
        this.FB.getProveedorCompra(this.lastLote);
        this.FB.getAnticipoProveedor(this.lastLote);
        this.navCtrl.navigateBack(["cardcompras"]);
    };
    CardlotesPage.prototype.irEstado = function () {
        this.navCtrl.navigateBack(["cardlistaproveedores"]);
    };
    CardlotesPage.prototype.estadoGeneral = function () {
        var _this = this;
        this.creditoGeneral = 0;
        this.debitoGeneral = 0;
        this.saldoGeneral = 0;
        console.log("this.FB.listaLotesDelProveedor ", this.FB.listaLotesDelProveedor);
        this.FB.listaLotesDelProveedor.forEach(function (element) {
            _this.creditoGeneral += element.compra;
            _this.debitoGeneral += element.anticipo;
        });
        this.saldoGeneral = (this.debitoGeneral - this.creditoGeneral);
        console.log("object", this.debitoGeneral, this.creditoGeneral, this.saldoGeneral);
        return this.debitoGeneral, this.creditoGeneral, this.saldoGeneral;
    };
    CardlotesPage.prototype.saldarLotes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: saldar_page_1.SaldarPage,
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            componentProps: {
                                idProv: this.idProveedorRecibido,
                                creditoGeneral: this.creditoGeneral,
                                debitoGeneral: this.debitoGeneral,
                                saldoGeneral: this.saldoGeneral
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        console.log("Esperando esto: ", data);
                        if (data != undefined) {
                            console.log("Entro al if: ", data);
                            // this.ngOnInit();
                            this.navCtrl.navigateBack(["main-menu"]);
                            this.FB.alertaSaldarLote(this.idProveedorRecibido, data);
                            // this.FB.saldarDeudasProveedor(this.idProveedorRecibido, data);
                            // this.FB.eliminarNodoProveedor(this.idProveedorRecibido);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // async alerta(data) {
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     header: 'Saldado correctamente',
    //     message: 'El proximo lote inicia con $' + data,
    //     buttons: [
    //       {
    //         text: 'Aceptar',
    //         handler: () => {
    //         }
    //       }
    //     ]
    //   });
    //   await alert.present();
    // }
    CardlotesPage.prototype.saldar = function () { };
    CardlotesPage = __decorate([
        core_1.Component({
            selector: 'app-cardlotes',
            templateUrl: './cardlotes.page.html',
            styleUrls: ['./cardlotes.page.scss']
        })
    ], CardlotesPage);
    return CardlotesPage;
}());
exports.CardlotesPage = CardlotesPage;
