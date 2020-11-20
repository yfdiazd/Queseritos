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
exports.HomeventasPage = void 0;
var core_1 = require("@angular/core");
var confirmarventa_page_1 = require("src/app/formularios/confirmarventa/confirmarventa.page");
var HomeventasPage = /** @class */ (function () {
    function HomeventasPage(FB, PopoverController, modalController, alertController) {
        this.FB = FB;
        this.PopoverController = PopoverController;
        this.modalController = modalController;
        this.alertController = alertController;
        this.fbsumapeso = "$2.000";
        this.pesoTotal = "200";
        this.fbsaldoPesoConfirmado = "3000.000";
        this.sumaPeso = 0;
        this.mostrarCrearConfirmar = true;
    }
    HomeventasPage.prototype.ngOnInit = function () {
        this.traerPeso();
        this.sumarPesos();
    };
    HomeventasPage.prototype.traerPeso = function () {
        return __awaiter(this, void 0, void 0, function () {
            var valorPeso;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.FB.infoCompraUnica];
                    case 1:
                        valorPeso = _a.sent();
                        valorPeso.forEach(function (info) {
                            _this.pesoTotal = info.pesoPesada;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeventasPage.prototype.sumarPesos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.sumaPeso = 0;
                // let valorPeso = await this.FB.pesajeConfirmadoLista;
                this.FB.pesajeConfirmadoLista.forEach(function (info) {
                    _this.sumaPeso = _this.sumaPeso + parseInt(info.cantidadEstado);
                });
                return [2 /*return*/];
            });
        });
    };
    HomeventasPage.prototype.presentPopover = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PopoverController.create({
                            component: confirmarventa_page_1.ConfirmarventaPage,
                            cssClass: 'popover_style',
                            translucent: true,
                            keyboardClose: false,
                            backdropDismiss: false,
                            componentProps: {
                                idCompra: this.idVenta,
                                idProv: this.idClient,
                                pesoTotal: this.pesoTotal
                            }
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        this.sumarPesos();
                        this.traerPeso();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeventasPage.prototype.volver = function () {
        this.modalController.dismiss();
    };
    HomeventasPage.prototype.removeRegister = function (lista) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("valores", this.idClient, this.idVenta, lista);
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: 'Cuidado!',
                                message: 'Esta seguro de <strong>eliminar</strong> el pesaje confirmado?',
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            console.log('Confirm Cancel: blah');
                                        }
                                    }, {
                                        text: 'SI',
                                        handler: function () {
                                            console.log('Confirm Okay', lista);
                                            _this.FB.deletePesajeConfirmado(_this.idClient, _this.idVenta, lista.id, lista.costoTotalEstado, _this.lote);
                                            _this.FB.getInfoCompra(_this.idClient, _this.idVenta, _this.lote);
                                            _this.FB.getPesajeConfirmado(_this.idClient, _this.idVenta, _this.lote);
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], HomeventasPage.prototype, "idVenta");
    __decorate([
        core_1.Input()
    ], HomeventasPage.prototype, "idClient");
    __decorate([
        core_1.Input()
    ], HomeventasPage.prototype, "lote");
    HomeventasPage = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        core_1.Component({
            selector: 'app-homeventas',
            templateUrl: './homeventas.page.html',
            styleUrls: ['./homeventas.page.scss']
        })
    ], HomeventasPage);
    return HomeventasPage;
}());
exports.HomeventasPage = HomeventasPage;
