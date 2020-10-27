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
var CardcomprasPage = /** @class */ (function () {
    function CardcomprasPage(actionSheetController, router, FB, alertController, navCtrl) {
        this.actionSheetController = actionSheetController;
        this.router = router;
        this.FB = FB;
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.pesoacumulado = 0;
        this.saldodebitototal = 0;
        this.saldocreditotal = 0;
        this.input = { data: [] };
        this.nombres = [];
        //Esta lista va a obtener todas las compras existentes
        this.listaAllCompras = [];
        //Esta lista va a guardar las compras de un mismo proveedor
        this.listaProvNoRepetidos = [];
        //Lista de idproveedores
        this.listaIdProveedores = [];
        // Lista de nombres
        this.listaNombres = [];
        //Datos para mostrar en el card
        this.dataCard = [];
        //Datos consolidados para la visualización
        this.listaCard = [];
        this.listaAnt = [];
    }
    CardcomprasPage.prototype.ngOnInit = function () {
        // this.validacionLote();
        this.listaCards();
    };
    CardcomprasPage.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        this.listaCards();
        this.listaAnt = [];
        this.listaCard = [];
        this.objImp = [];
        this.saldocreditotal = 0;
        this.pesoacumulado = 0;
        setTimeout(function () {
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    };
    CardcomprasPage.prototype.traerNombre = function () {
        var _this = this;
        this.nombreProv = [];
        this.FB.proveedoresLista.forEach(function (element) {
            _this.listaPaVer.forEach(function (element2) {
                if (element.id == element2.idProveedor) {
                    _this.nombreProv.push({ nombre: element.nombre, idProv: element.id });
                }
            });
        });
        console.log("Nombres de los proveedores:", this.nombreProv);
    };
    CardcomprasPage.prototype.validacionLote = function () {
        this.loteActual = (this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1));
        console.log("Lote actual", this.loteActual);
        console.log("LOTE ULTIMO:   ", this.loteActual.toString());
        console.log("FECHA ACTUAL ----", this.FB.fechaActual());
        if (this.loteActual.toString().includes(this.FB.fechaActual())) {
            console.log("Si es el mismo");
        }
        else {
            this.alertConfirmarNuevoLote();
        }
    };
    CardcomprasPage.prototype.listaCards = function () {
        var _this = this;
        this.objImp = [];
        this.onbjAnt = [];
        this.listaCard = [];
        this.listaAnt = [];
        this.saldocreditotal = 0;
        this.pesoacumulado = 0;
        this.saldodebitototal = 0;
        console.log("Lista de provedores con compra", this.FB.proveedorCompraLista);
        console.log("Lista anticipos ", this.FB.anticipoCompraLista);
        this.FB.proveedorCompraLista.forEach(function (element) {
            var total = 0;
            var totalCosto = 0;
            var totalBultos = 0;
            var keys = Object.keys(element);
            var lotes = element[keys[0]].idProveedor;
            keys.forEach(function (key) {
                total += element[key].pesoBultos;
                totalBultos += element[key].totalBulto;
                totalCosto += element[key].costoTotalCompra;
                _this.pesoacumulado += element[key].pesoBultos;
                _this.saldocreditotal += element[key].costoTotalCompra;
            });
            _this.objImp = ({
                idProvedor: lotes,
                bultos: totalBultos,
                costo: totalCosto,
                peso: total
            });
            _this.listaCard.push(_this.objImp);
        });
        this.FB.anticipoCompraLista.forEach(function (element) {
            var totalAnt = 0;
            var keys = Object.keys(element);
            var prov = element[keys[0]].idProveedor;
            keys.forEach(function (key) {
                totalAnt += element[key].valorAnticipo;
                _this.saldodebitototal += element[key].valorAnticipo;
            });
            _this.onbjAnt = ({
                valorAnt: totalAnt,
                idProvee: prov
            });
            _this.listaAnt.push(_this.onbjAnt);
        });
        console.log("asdasdasdasdasd -*-*-*-*-*-*-*-*-*-", this.listaCard);
        console.log("---------------- -*-*-*-*-*-*-*-*-*-", this.listaAnt);
        this.recorreListas();
        return this.listaCard, this.listaAnt, this.pesoacumulado, this.saldocreditotal, this.saldodebitototal;
    };
    CardcomprasPage.prototype.listaAnticipo = function () {
    };
    CardcomprasPage.prototype.recorreListas = function () {
        var _this = this;
        this.listaPaVer = [];
        if (this.listaAnt.length != 0) {
            console.log("siii diferente a 0000 ", this.listaAnt.length);
            this.listaCard.forEach(function (element) {
                _this.listaAnt.forEach(function (element2) {
                    if (element.idProvedor == element2.idProvee) {
                        _this.obtPa = ({
                            idProvedor: element.idProvedor,
                            bultos: element.bultos,
                            costo: element.costo,
                            peso: element.peso,
                            debito: element2.valorAnt
                        });
                        _this.listaPaVer.push(_this.obtPa);
                        _this.obtPa = null;
                    }
                    else if (_this.listaPaVer.filter(function (valor) {
                        return valor.idProvedor == element.idProvedor;
                    }).length == 0 && _this.listaAnt.filter(function (valorF) {
                        return valorF.idProvee == element.idProvedor;
                    }).length == 0) {
                        console.log("llego vaciooo ");
                        _this.obtPa = ({
                            idProvedor: element.idProvedor,
                            bultos: element.bultos,
                            costo: element.costo,
                            peso: element.peso,
                            debito: 0
                        });
                        _this.listaPaVer.push(_this.obtPa);
                        _this.obtPa = null;
                    }
                });
            });
        }
        else {
            this.listaCard.forEach(function (elementC) {
                _this.obtPa = ({
                    idProvedor: elementC.idProvedor,
                    bultos: elementC.bultos,
                    costo: elementC.costo,
                    peso: elementC.peso,
                    debito: 0
                });
                _this.listaPaVer.push(_this.obtPa);
                _this.obtPa = null;
            });
        }
        console.log("*----------------------------- ", this.listaPaVer);
        return this.listaPaVer;
    };
    CardcomprasPage.prototype.irVender = function () {
        this.router.navigate(["cardcompras"]);
    };
    CardcomprasPage.prototype.irPesajeCompra = function (card) {
        // this.FB.getNumBultos(card.id);
        this.navCtrl.navigateForward(["crearcompra/", card.idProveedor]);
    };
    CardcomprasPage.prototype.irCompraDetallada = function (card) {
        this.FB.getPesajeCompra(card.idProvedor);
        this.navCtrl.navigateForward(["cardcompradetallada/", card.idProvedor]);
    };
    CardcomprasPage.prototype.opciones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Que deseas hacer?',
                            cssClass: 'my-custom-class',
                            mode: 'md',
                            buttons: [{
                                    text: 'Agregar proveedor',
                                    icon: 'person-add',
                                    handler: function () {
                                        _this.input = { data: [] };
                                        _this.listaProveedores = [];
                                        _this.FB.proveedoresLista.forEach(function (element) {
                                            var provee = element;
                                            _this.input.data.push({ name: provee.nombre, type: 'radio', label: provee.nombre, value: provee.id });
                                        });
                                        _this.alertProveedores();
                                        // var elemento = document.getElementById("select-alert");
                                        // elemento.click();
                                    }
                                }, {
                                    text: 'Distribuir pesos',
                                    icon: 'podium',
                                    handler: function () {
                                        console.log('Share clicked');
                                    }
                                }, {
                                    text: 'Quitar compra',
                                    role: 'destructive',
                                    icon: 'trash',
                                    handler: function () {
                                        console.log('Delete clicked');
                                    }
                                }, {
                                    text: 'Cancelar',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
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
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (value) {
                                        console.log('Se envia el id del proveedor: ', value);
                                        _this.navCtrl.navigateForward(["crearcompra/", value]);
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
                            header: 'El ultimo lote no coincide con la fecha actual',
                            message: '¿Desea crear un nuevo lote?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Mantiene el lote actual', _this.loteActual.toString());
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (value) {
                                        _this.FB.generarLote();
                                        _this.loteActual = (_this.FB.ultimoLote.slice(_this.FB.ultimoLote.length - 1));
                                        console.log("El nuevo lote ha sido creado", _this.loteActual.toString());
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
