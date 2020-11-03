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
exports.DetallelotePage = void 0;
var core_1 = require("@angular/core");
var creartrueque_page_1 = require("../creartrueque/creartrueque.page");
var vistaimg_page_1 = require("./vistaimg/vistaimg.page");
var DetallelotePage = /** @class */ (function () {
    function DetallelotePage(route, FB, modalController, alertController, navCtrl) {
        this.route = route;
        this.FB = FB;
        this.modalController = modalController;
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.Lotenum = "17-10-2020-L1";
        this.proveedor = "fernanda";
    }
    //Lista de anticipos para mostrar de la compra
    DetallelotePage.prototype.ngOnInit = function () {
        var idLote = this.route.snapshot.paramMap.get("id");
        var idProv = this.route.snapshot.paramMap.get("prov");
        this.loteRecibido = idLote;
        this.provRecibido = idProv;
        this.traerNombre();
        this.generarData();
    };
    DetallelotePage.prototype.generarData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lista, productos;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataFront = [];
                        return [4 /*yield*/, this.FB.pesajeLoteProveedorLista];
                    case 1:
                        lista = _a.sent();
                        return [4 /*yield*/, this.FB.productosLista];
                    case 2:
                        productos = _a.sent();
                        console.log("lista obtenida", lista);
                        lista.forEach(function (compra) {
                            console.log("Esto es los anticipos: ", compra.anticipos);
                            productos.forEach(function (producto) {
                                if (compra.idProducto == producto.id) {
                                    _this.dataFront.push({
                                        anticipos: compra.anticipos,
                                        bultoLista: compra.bultoLista,
                                        costoTotalCompra: compra.costoTotalCompra,
                                        fechaCompra: compra.fechaCompra,
                                        id: compra.id,
                                        idProducto: compra.idProducto,
                                        idProveedor: compra.idProveedor,
                                        lote: compra.lote,
                                        pesoBultos: compra.pesoBultos,
                                        totalBulto: compra.totalBulto,
                                        nompreProducto: producto.descripcion
                                    });
                                }
                            });
                        });
                        return [2 /*return*/, this.dataFront];
                }
            });
        });
    };
    DetallelotePage.prototype.verImagen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var foto, popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.FB.getFoto(this.provRecibido, data.id)];
                    case 1:
                        foto = _a.sent();
                        console.log("esto es la foto", foto);
                        return [4 /*yield*/, this.modalController.create({
                                component: vistaimg_page_1.VistaimgPage,
                                cssClass: 'img_modal',
                                keyboardClose: false,
                                backdropDismiss: false
                            })];
                    case 2:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DetallelotePage.prototype.traerNombre = function () {
        var _this = this;
        this.nombreProv = [];
        console.log("Nombre prov", this.provRecibido);
        this.FB.proveedoresLista.forEach(function (element) {
            if (element.id == _this.provRecibido) {
                _this.nombreProv = element.nombre;
            }
        });
    };
    DetallelotePage.prototype.crearModal = function (item) {
        // this.navCtrl.navigateForward(['creartrueque/', item.id])
        this.irHomeAnticipo(item);
    };
    DetallelotePage.prototype.removeRegister = function (lista) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Cuidado!',
                            message: 'Esta seguro de eliminar el anticipo?',
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
                                        _this.FB.deleteAnticiposApesajeCompra(lista.idProveedor, lista.idPesajeCompra, lista.id, lista.valorAnticipo, _this.loteRecibido);
                                        _this.FB.getPesajeLoteProveedor(_this.provRecibido, _this.loteRecibido);
                                        _this.FB.getAnticiposLoteProveedor(_this.provRecibido, _this.loteRecibido);
                                        _this.generarData();
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
    DetallelotePage.prototype.irHomeAnticipo = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: creartrueque_page_1.CreartruequePage,
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            componentProps: {
                                datos: item
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        this.generarData();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetallelotePage.prototype.irInicio = function () {
        this.navCtrl.navigateBack(["main-menu"]);
    };
    DetallelotePage.prototype.irCompras = function () {
        this.navCtrl.navigateBack(["cardcompras"]);
    };
    DetallelotePage.prototype.irEstado = function () {
        this.navCtrl.navigateBack(["cardlistaproveedores"]);
    };
    DetallelotePage = __decorate([
        core_1.Component({
            selector: 'app-detallelote',
            templateUrl: './detallelote.page.html',
            styleUrls: ['./detallelote.page.scss']
        })
    ], DetallelotePage);
    return DetallelotePage;
}());
exports.DetallelotePage = DetallelotePage;
