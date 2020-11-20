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
exports.CardcomprasPage = void 0;
var core_1 = require("@angular/core");
var crearcompra_page_1 = require("src/app/formularios/crearcompra/crearcompra.page");
var CardcomprasPage = /** @class */ (function () {
    function CardcomprasPage(actionSheetController, FB, alertController, navCtrl, loadingCtrl, modalController) {
        this.actionSheetController = actionSheetController;
        this.FB = FB;
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalController = modalController;
        this.input = { data: [] };
        //Lista de nombres a mostrar
        this.listaDatos = [];
        this.lastLote = [];
        console.log("Esto debe imprimirse siempre. CONSTRUCTOR");
    }
    CardcomprasPage.prototype.ngOnInit = function () {
        var _this = this;
        this.validacionLote();
        this.FB.getLoteProveedor();
        this.traerNombre();
        this.cambioSaldo();
        this.presentLoading('Espere...');
        this.lastLote = [];
        this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1));
        setTimeout(function () {
            _this.loading.dismiss();
        }, 1500);
    };
    CardcomprasPage.prototype.presentLoading = function (message) {
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
    CardcomprasPage.prototype.doRefresh = function (event) {
        this.lastLote = [];
        this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1));
        this.validacionLote();
        this.FB.getLoteProveedor();
        this.FB.getAnticipoProveedor();
        this.traerNombre();
        this.cambioSaldo();
        setTimeout(function () {
            event.target.complete();
        }, 1000);
    };
    CardcomprasPage.prototype.cambioSaldo = function () {
        var valor1 = 0;
        var valor2 = 0;
        valor1 = this.FB.saldodebitototal;
        valor2 = this.FB.saldocreditotal;
        if ((valor1 - valor2) < 0) {
            document.getElementById("valorCss").style.color = "crimson";
            document.getElementById("valorCss").style.textShadow = "#500707 1px 1px 1px";
        }
        else {
            document.getElementById("valorCss").style.color = "lime";
        }
    };
    CardcomprasPage.prototype.traerNombre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var proveedoresLista, listaPaVer;
            var _this = this;
            return __generator(this, function (_a) {
                this.listaDatos = [];
                this.objProv = null;
                proveedoresLista = this.FB.proveedoresLista;
                listaPaVer = this.FB.listaPaVer;
                console.log("Esto se ve: ", proveedoresLista, " y ", listaPaVer);
                proveedoresLista.forEach(function (element) {
                    listaPaVer.forEach(function (element2) {
                        if (element.id == element2.idProvedor) {
                            _this.objProv = ({
                                nombre: element.nombre + " " + element.apellido,
                                idProv: element.id,
                                bultos: element2.bultos,
                                costo: element2.costo,
                                peso: element2.peso,
                                debito: element2.debito
                            });
                            _this.listaDatos.push(_this.objProv);
                        }
                    });
                });
                return [2 /*return*/, this.listaDatos];
            });
        });
    };
    //Validación del ultimo lote con el día en que ingresa a cardcompras: Muestra el alert
    CardcomprasPage.prototype.validacionLote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ordenLotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.FB.listaOrdenLotes()];
                    case 1:
                        ordenLotes = _a.sent();
                        this.loteActual = (ordenLotes.slice(this.FB.ultimoLote.length - 1));
                        if (this.loteActual.toString().includes(this.FB.fechaActual())) {
                        }
                        else {
                            this.alertConfirmarNuevoLote();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CardcomprasPage.prototype.irCompra = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: crearcompra_page_1.CrearcompraPage,
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            componentProps: {
                                idProveedor: card
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
    CardcomprasPage.prototype.irCompraDetallada = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.FB.getPesajeCompra(card.idProv, this.lastLote.toString());
                this.navCtrl.navigateForward(["cardcompradetallada/", card.idProv]);
                return [2 /*return*/];
            });
        });
    };
    CardcomprasPage.prototype.opciones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.input = { data: [] };
                this.listaProveedores = [];
                this.FB.proveedoresLista.forEach(function (element) {
                    var provee = element;
                    _this.input.data.push({ name: provee.nombre, type: 'radio', label: provee.nombre, value: provee.id });
                });
                this.alertProveedores();
                return [2 /*return*/];
            });
        });
    };
    CardcomprasPage.prototype.alertProveedores = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Proveedores',
                            inputs: this.input.data,
                            keyboardClose: false,
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (value) {
                                        _this.irCompra(value);
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
    CardcomprasPage.prototype.alertConfirmarNuevoLote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            header: "El ultimo lote no coincide con la fecha actual",
                            subHeader: this.loteActual,
                            message: '¿Desea crear un nuevo lote?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (value) {
                                        _this.FB.generarLote();
                                        _this.loteActual = (_this.FB.ultimoLote.slice(_this.FB.ultimoLote.length - 1));
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
    CardcomprasPage.prototype.irInicio = function () {
        this.navCtrl.navigateBack(["main-menu"]);
    };
    CardcomprasPage.prototype.irCompras = function () {
        this.navCtrl.navigateBack(["cardcompras"]);
    };
    CardcomprasPage.prototype.irEstado = function () {
        this.navCtrl.navigateBack(["cardlistaproveedores"]);
    };
    CardcomprasPage = __decorate([
        core_1.Component({
            selector: 'app-cardcompras',
            templateUrl: './cardcompras.page.html',
            styleUrls: ['./cardcompras.page.scss']
        })
    ], CardcomprasPage);
    return CardcomprasPage;
}());
exports.CardcomprasPage = CardcomprasPage;
