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
exports.CardlistaproveedoresPage = void 0;
var core_1 = require("@angular/core");
var creartrueque_page_1 = require("src/app/formularios/creartrueque/creartrueque.page");
var CardlistaproveedoresPage = /** @class */ (function () {
    function CardlistaproveedoresPage(modalCtrl, menu, FB, navCtrl, alertController, router, route) {
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.FB = FB;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.router = router;
        this.route = route;
        this.cont = 0;
        this.credito = 0;
        this.debito = 0;
        this.saldo = 0;
        this.validarTotales();
        this.FB.getProveedoresCompra();
        this.listarproveedores();
        this.listadoproveedores();
        this.FB.getTodo();
    }
    CardlistaproveedoresPage.prototype.ngOnInit = function () {
        console.log("Entro al ngOnInit de Cardlistaproveedores");
        this.FB.getProveedoresCompra();
        this.listarproveedores();
        this.listadoproveedores();
        this.FB.getTodo();
        this.validarTotales();
        console.log("totales:", this.FB.credito, this.FB.debito, this.FB.saldo);
        this.credito = this.FB.credito;
        this.debito = this.FB.debito;
        this.saldo = this.FB.saldo;
    };
    CardlistaproveedoresPage.prototype.listarproveedores = function () {
        var _this = this;
        this.listanombres = [];
        this.FB.proveedoresLista.forEach(function (proveedor) {
            _this.listanombres.push({ nombres: proveedor.nombre, id: proveedor.id, cantidad: 0 });
        });
    };
    CardlistaproveedoresPage.prototype.listadoproveedores = function () {
        var _this = this;
        this.listanombres1 = [];
        this.FB.proveedoresLista.forEach(function (element) {
            _this.listanombres1.push((element.nombre + " " + element.apellido));
        });
        return this.listanombres1;
    };
    CardlistaproveedoresPage.prototype.irHomeAnticipo = function (idProveedor, lote) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: creartrueque_page_1.CreartruequePage,
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            componentProps: {
                                idProveedor: idProveedor,
                                id: 0,
                                lote: lote,
                                card: "si"
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
    CardlistaproveedoresPage.prototype.irCardLote = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.FB.proveedoresLista.forEach(function (element) {
                    if (element.nombre + " " + element.apellido == input) {
                        if (_this.FB.proveedoresCompraLista.includes(element.id)) {
                            console.log("Se envia el id: ", element.id);
                            _this.FB.getLotesDelProveedor(element.id);
                            _this.navCtrl.navigateForward(['cardlotes/', element.id]);
                        }
                        else {
                            console.log("Se envia a crear el id: ", element.id);
                            _this.presentAlertConfirm(element.id);
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CardlistaproveedoresPage.prototype.presentAlertConfirm = function (idProveedor) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Esto me envia el proveedor seleccionado", idProveedor);
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: 'Alerta!',
                                keyboardClose: false,
                                backdropDismiss: false,
                                message: 'El proveedor no tiene asociado lote de compra, ¿Desea crearle un anticipo?',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            console.log('canceló no hace nada');
                                        }
                                    }, {
                                        text: 'Ok',
                                        handler: function () {
                                            var ordenLotes = _this.FB.listaOrdenLotes();
                                            var loteLocal = [];
                                            loteLocal = (ordenLotes.slice(ordenLotes.length - 1));
                                            _this.irHomeAnticipo(idProveedor, loteLocal.toString());
                                            _this.navCtrl.navigateForward(["detallelote/", loteLocal.toString(), idProveedor]);
                                            _this.alertController.dismiss();
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
    CardlistaproveedoresPage.prototype.getItems = function (ev) {
        this.listanombres1;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.listanombres1 = this.listanombres1.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            if (val == '' || val == undefined) {
                return this.listadoproveedores();
            }
        }
    };
    CardlistaproveedoresPage.prototype.validarTotales = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credito;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.FB.getTodo()];
                    case 1:
                        credito = _a.sent();
                        console.log("Credito", this.credito);
                        return [2 /*return*/];
                }
            });
        });
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
