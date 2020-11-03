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
exports.CardcompradetalladaPage = void 0;
var core_1 = require("@angular/core");
var homepesajes_page_1 = require("src/app/home/homepesajes/homepesajes.page");
var CardcompradetalladaPage = /** @class */ (function () {
    function CardcompradetalladaPage(route, FB, modalController, alertController, navCtrl) {
        this.route = route;
        this.FB = FB;
        this.modalController = modalController;
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        //Datos consolidados para la visualización
        this.listaCard = [];
        //lista de la compra que se recorre en el HTML
        this.listaCompras = [];
        this.cantidadConfirmaciones = 0;
    }
    CardcompradetalladaPage.prototype.ngOnInit = function () {
        var id = this.route.snapshot.paramMap.get("id");
        this.idProveedor = id;
        this.FB.getPesajeCompra(this.idProveedor);
        this.FB.getProductos();
        this.traerTipoQueso();
        this.traerNombre();
        console.log("Se recibe el proveedor: ", this.idProveedor);
        console.log("listaParaElFront", this.listaCompras);
    };
    CardcompradetalladaPage.prototype.traerTipoQueso = function () {
        var _this = this;
        this.tipoQueso = [];
        this.FB.getProductos();
        this.FB.productosLista.forEach(function (element) {
            _this.FB.pesajeCompraLista.forEach(function (element2) {
                if (element.id == element2.idProducto) {
                    _this.tipoQueso.push({ descripcion: element.descripcion, id: element2.idProducto });
                }
            });
        });
    };
    CardcompradetalladaPage.prototype.traerNombre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.nombreProv = [];
                this.FB.proveedoresLista.forEach(function (element) {
                    _this.FB.pesajeCompraLista.forEach(function (element2) {
                        if (element.id == element2.idProveedor) {
                            _this.nombreProv = element.nombre;
                        }
                    });
                });
                this.FB.pesajeCompraLista.forEach(function (pesaje) {
                    _this.FB.productosLista.forEach(function (producto) {
                        if (pesaje.idProducto == producto.id) {
                            _this.listaCompras.push({
                                anticipos: pesaje.anticipos,
                                bultoLista: pesaje.bultoLista,
                                costoTotalCompra: pesaje.costoTotalCompra,
                                fechaCompra: pesaje.fechaCompra,
                                id: pesaje.id,
                                idProducto: pesaje.idProducto,
                                idProveedor: pesaje.idProveedor,
                                lote: pesaje.lote,
                                pesoBultos: pesaje.pesoBultos,
                                totalBulto: pesaje.totalBulto,
                                nompreProducto: producto.descripcion
                            });
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    CardcompradetalladaPage.prototype.modalConfirmarPesaje = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.FB.getInfoCompra(this.idProveedor, card.id);
                        this.FB.getPesajeConfirmado(this.idProveedor, card.id);
                        return [4 /*yield*/, this.modalController.create({
                                component: homepesajes_page_1.HomepesajesPage,
                                cssClass: 'my-custom-class',
                                keyboardClose: false,
                                backdropDismiss: false,
                                componentProps: {
                                    idCompra: card.id,
                                    idProv: this.idProveedor
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
    CardcompradetalladaPage.prototype.irCompra = function () {
        console.log("Se envia este id proveedor", this.idProveedor);
        this.navCtrl.navigateBack(["crearcompra/", this.idProveedor]);
    };
    CardcompradetalladaPage.prototype.eliminarRegistro = function (lista) {
        if (lista.anticipos == 0 && lista.costoTotalCompra == 0) {
            this.removeRegister(lista);
        }
        else {
            this.alertRemove();
        }
    };
    CardcompradetalladaPage.prototype.removeRegister = function (lista) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Cuidado!',
                            message: 'Esta seguro de eliminar el pesaje?',
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
                                        _this.FB.deletePesajeCompra(_this.idProveedor, lista.id);
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
    CardcompradetalladaPage.prototype.alertRemove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Restricción',
                            message: 'El pesaje ya tiene un anticipo y/o un peso confirmado.',
                            buttons: ['Aceptar']
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
    CardcompradetalladaPage.prototype.alertEditar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Esta en desarrollo',
                            message: 'Aún no esta disponible esta opción',
                            buttons: ['Aceptar']
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
    CardcompradetalladaPage.prototype.irInicio = function () {
        this.navCtrl.navigateBack(["main-menu"]);
    };
    CardcompradetalladaPage.prototype.irCompras = function () {
        this.navCtrl.navigateBack(["cardcompras"]);
    };
    CardcompradetalladaPage.prototype.irEstado = function () {
        this.navCtrl.navigateBack(["cardlistaproveedores"]);
    };
    CardcompradetalladaPage = __decorate([
        core_1.Component({
            selector: 'app-cardcompradetallada',
            templateUrl: './cardcompradetallada.page.html',
            styleUrls: ['./cardcompradetallada.page.scss']
        })
    ], CardcompradetalladaPage);
    return CardcompradetalladaPage;
}());
exports.CardcompradetalladaPage = CardcompradetalladaPage;
