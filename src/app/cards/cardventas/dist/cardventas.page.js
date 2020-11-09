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
exports.CardventasPage = void 0;
var core_1 = require("@angular/core");
var homeventas_page_1 = require("src/app/home/homeventas/homeventas.page");
var CardventasPage = /** @class */ (function () {
    function CardventasPage(FB, modalController, alertController, toastController, route, navCtrl, loadingCtrl) {
        this.FB = FB;
        this.modalController = modalController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.route = route;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.anofecha = new Date();
        this.show = true;
        this.hiden = false;
        //Datos consolidados para la visualización
        this.listaCard = [];
        //lista de la venta que se recorre en el HTML
        this.listaVentas = [];
    }
    CardventasPage.prototype.ngOnInit = function () {
        var _this = this;
        this.customPickerOptions = {
            buttons: [{
                    text: 'Aceptar',
                    handler: function (evento) {
                        _this.show = false;
                        _this.hiden = true;
                        console.log("imprime event", evento);
                        _this.getListaFiltrada(evento);
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () {
                        console.log('Clicked Log. Do not Dismiss.');
                        return true;
                    }
                }]
        };
        var id = this.route.snapshot.paramMap.get("id");
        this.idcliente = id;
        this.traerNombre();
        setTimeout(function () {
            _this.loading.dismiss();
        }, 1500);
    };
    CardventasPage.prototype.presentLoading = function (message) {
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
    CardventasPage.prototype.doRefresh = function (event) {
        this.traerNombre();
        this.presentLoading('Espere...');
        this.recorriendolista();
        setTimeout(function () {
            event.target.complete();
        }, 1000);
    };
    CardventasPage.prototype.getListaFiltrada = function (event) {
        this.FB.ventasclienteLista;
        this.listaFiltrada = this.FB.ventasclienteLista;
        console.log("esoto es la lista filtrada ", this.listaFiltrada);
        var varY = event.year.value;
        var varM = event.month.value;
        var varym = (varY + "-" + varM);
        console.log("buscador   ---- ", varym);
        if (varym && varym.trim() != '') {
            this.listaFiltrada = this.listaFiltrada.filter(function (item) {
                return (item.fechaEnvio.indexOf(varym) > -1);
            });
        }
        else {
            if (varym == '' || varym == undefined) {
                this.listaFiltrada = this.FB.ventasclienteLista;
                return this.listaFiltrada;
            }
        }
    };
    CardventasPage.prototype.irVender = function (input) {
        console.log("Se envia este id cliente", this.idcliente);
        this.navCtrl.navigateForward(["crearenviocliente/", this.idcliente]);
    };
    CardventasPage.prototype.modalConfirmarPesada = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: homeventas_page_1.HomeventasPage,
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            componentProps: {
                                idVenta: card.id,
                                idCliente: this.idcliente
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CardventasPage.prototype.recorriendolista = function () {
        this.FB.ventasclienteListaMes.forEach(function (element) {
            console.log("elementttttt", element);
        });
    };
    CardventasPage.prototype.traerNombre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.nombreCliente = [];
                //this.listaVentas = [];
                console.log("idcliente traer nombre:", this.idcliente);
                this.FB.clientesLista.forEach(function (element) {
                    if (element.id == _this.idcliente) {
                        _this.nombreCliente = element.nombres;
                    }
                });
                console.log("imprime nombre del cliente", this.nombreCliente);
                return [2 /*return*/, this.nombreCliente];
            });
        });
    };
    CardventasPage = __decorate([
        core_1.Component({
            selector: 'app-cardventas',
            templateUrl: './cardventas.page.html',
            styleUrls: ['./cardventas.page.scss']
        })
    ], CardventasPage);
    return CardventasPage;
}());
exports.CardventasPage = CardventasPage;
