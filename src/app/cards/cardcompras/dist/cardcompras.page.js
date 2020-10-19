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
        this.pesoacumulado = 200;
        this.saldodebitototal = 120000000;
        this.saldocreditotal = 140000000;
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
        this.pesoMostrar = 0;
        this.bultosMostrar = 0;
        this.FB.getCompras();
        this.obtenerProveedoresRepetidos();
    }
    CardcomprasPage.prototype.ngOnInit = function () {
    };
    CardcomprasPage.prototype.obtenerProveedoresRepetidos = function () {
        var _this = this;
        //Esta lista va a guardar las compras de un mismo proveedor
        this.listaProvNoRepetidos = [];
        //Lista de idproveedores
        this.listaIdProveedores = [];
        // Lista de nombres
        this.listaNombres = [];
        //data recopilada en una lista de los proveedores con sus datos
        this.dataCard = [];
        //Data que se va a ver en el car
        this.listaCard = [];
        this.FB.getCompras();
        this.FB.listaCompras.forEach(function (element) {
            _this.listaIdProveedores.push(element.idProveedor);
        });
        console.log("Esto es la lista de IDS: ", this.listaIdProveedores);
        //Este coso guiarda en un array "uniqs" provedores sin repetirse.
        var uniqs = this.listaIdProveedores.filter(function (item, index, array) {
            return array.indexOf(item) === index;
        });
        this.listaProvNoRepetidos = uniqs;
        console.log("Esto es la lista proveedores sin repetirse: ", this.listaProvNoRepetidos);
        //----------------Esto es para traer el nombre del proveedor por ID ------------
        this.FB.proveedoresLista.forEach(function (element) {
            _this.listaProvNoRepetidos.forEach(function (element2) {
                if (element.id == element2) {
                    _this.listaNombres.push({ nombre: element.nombre, id: element2 });
                    console.log("Este es el nombre ", element.nombre, " de el id: ", element2);
                }
            });
        });
        //----------------Esto es para traer el nombre del proveedor por ID ------------
        this.FB.listaCompras.forEach(function (element) {
            _this.listaProvNoRepetidos.forEach(function (element2) {
                if (element.idProveedor == element2) {
                    _this.dataCard.push({
                        id: element2,
                        peso: element.pesoBultos,
                        bultos: element.totalBulto,
                        costo: element.costoTotalCompra
                    });
                }
            });
        });
        console.log("Esto es lo que se mostrará en la card", this.dataCard);
        /*------------------------Falata terminar este metodo---
          Lo que hace este es sumar (costo, peso, ° bultos) de cada pesaje y
          sumarlo en una variable para mostrarlo en el card del HTML
        */
        this.listaProvNoRepetidos.forEach(function (element) {
            _this.dataCard.forEach(function (element2) {
                if (element == element2.id) {
                    _this.pesoMostrar = _this.pesoMostrar + element2.peso;
                    _this.bultosMostrar = _this.bultosMostrar + element2.bultos;
                    _this.listaCard.push({ id: element2.id, peso: _this.pesoMostrar, bultos: _this.bultosMostrar, costo: element.costoTotalCompra });
                }
            });
        });
        console.log("Esto es el peso actual", this.pesoMostrar);
        console.log("Esto es la data final----", this.listaCard);
    };
    CardcomprasPage.prototype.irVender = function () {
        this.router.navigate(["cardcompras"]);
    };
    CardcomprasPage.prototype.irPesajeCompra = function (card) {
        // this.FB.getNumBultos(card.id);
        this.navCtrl.navigateForward(["crearpesajecompra/", card.id]);
        console.log("ID:", card.id);
    };
    CardcomprasPage.prototype.irCompraDetallada = function () {
        this.navCtrl.navigateForward(["cardcompradetallada"]);
    };
    CardcomprasPage.prototype.presentActionSheet = function () {
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
                                        // this.presentAlertRadio();
                                        _this.input = { data: [] };
                                        _this.listaProveedores = [];
                                        console.log("this.listaProveedores: ", _this.listaProveedores);
                                        _this.FB.proveedoresLista.forEach(function (element) {
                                            var provee = element;
                                            _this.input.data.push({ name: provee.nombre, type: 'radio', label: provee.nombre, value: provee.id });
                                        });
                                        console.log("Se obtuvo esto_:", _this.input);
                                        _this.presentAlertRadio();
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
    CardcomprasPage.prototype.presentAlertRadio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Radio',
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
                                        _this.navCtrl.navigateForward(["crearpesajecompra/", value]);
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
