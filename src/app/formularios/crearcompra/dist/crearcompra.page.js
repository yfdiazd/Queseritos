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
exports.CrearcompraPage = void 0;
var core_1 = require("@angular/core");
var CrearcompraPage = /** @class */ (function () {
    function CrearcompraPage(alertController, FB, navCtrl, modalCtrl) {
        this.alertController = alertController;
        this.FB = FB;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.mostrar = false;
        //Variables para los bultos
        this.numbulto = 1;
        this.nuevoRegistro = [];
        this.bultoObj = null;
        this.listaBultosEdit = [];
        this.lastLote = [];
    }
    CrearcompraPage.prototype.ngOnInit = function () {
        this.fecha = this.FB.fechaActual();
        this.traerTipoQuesoDefault();
        this.traerNombre();
        this.validacion();
        this.lastLote = [];
        this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1));
        console.log("Se recibe id proveedor para editar: ", this.idProveedor);
        console.log("lista a mostrar", this.listaBultosEdit);
    };
    CrearcompraPage.prototype.traerTipoQuesoDefault = function () {
        var _this = this;
        if (this.productoEdit == undefined) {
            this.FB.productosLista.forEach(function (element) {
                if (element.estado == 1 && element.predetermina == true) {
                    _this.productoDefault = null;
                    _this.productoDefault = element.id;
                }
            });
        }
        else {
            this.productoDefault = this.productoEdit;
        }
    };
    CrearcompraPage.prototype.traerNombre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.nombreProv = [];
                this.FB.proveedoresLista.forEach(function (element) {
                    if (element.id == _this.idProveedor) {
                        _this.nombreProv = element.nombre;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CrearcompraPage.prototype.removeRegister = function (index) {
        this.listaBultosEdit.splice(index, 1);
        this.validacion();
    };
    CrearcompraPage.prototype.validacion = function () {
        if (this.listaBultosEdit.length > 0) {
            this.mostrar = true;
        }
        else {
            this.mostrar = false;
        }
    };
    CrearcompraPage.prototype.agregarBultoLista = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'alertAddPeso',
                            header: 'Creando bulto ' + (this.listaBultosEdit.length + 1) + '.',
                            keyboardClose: false,
                            backdropDismiss: false,
                            inputs: [
                                {
                                    cssClass: 'inputAddPeso',
                                    name: 'peso',
                                    type: 'number',
                                    value: "",
                                    min: "1",
                                    placeholder: 'Ingrese el peso.'
                                }
                            ],
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
                                        if (value != 0) {
                                            _this.bultoObj = {
                                                peso: value.peso
                                            };
                                            _this.listaBultosEdit.push(_this.bultoObj);
                                        }
                                        else {
                                            console.log("El peso no fue modificado");
                                        }
                                        _this.validacion();
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
    CrearcompraPage.prototype.edit = function (index) {
        this.listaBultosEdit.forEach(function (element) {
            if (element.index == index) {
                console.log("Si lo encontro", element.peso);
            }
        });
    };
    CrearcompraPage.prototype.contarPeso = function () {
        var _this = this;
        this.contadorPeso = 0;
        this.listaBultosEdit.forEach(function (element) {
            console.log("Peso de i: " + element.peso);
            _this.contadorPeso = _this.contadorPeso + parseInt(element.peso);
        });
        console.log("Total peso de los bultos: " + this.contadorPeso);
    };
    CrearcompraPage.prototype.guardar = function () {
        if (this.idCompra == undefined) {
            this.contarPeso();
            this.FB.agregarPesaje(this.idProveedor, this.productoDefault, this.listaBultosEdit.length, this.contadorPeso, this.listaBultosEdit);
            this.listaBultosEdit = [];
            this.FB.getPesajeCompra(this.idProveedor, this.lastLote.toString());
            this.navCtrl.navigateBack(["cardcompradetallada/", this.idProveedor]);
            this.modalCtrl.dismiss("true", "actualizar");
            this.FB.getProveedorCompra();
            this.FB.getAnticipoProveedor();
        }
        else {
            this.contarPeso();
            this.FB.updateBultoPesajeDetallado(this.idProveedor, this.idCompra, this.listaBultosEdit, this.contadorPeso, this.listaBultosEdit.length, this.productoDefault);
            this.listaBultosEdit = [];
            this.FB.getPesajeCompra(this.idProveedor, this.lastLote.toString());
            this.navCtrl.navigateBack(["cardcompradetallada/", this.idProveedor]);
            this.modalCtrl.dismiss("true", "actualizar");
            this.FB.getProveedorCompra();
            this.FB.getAnticipoProveedor();
        }
    };
    CrearcompraPage.prototype.volver = function () {
        this.modalCtrl.dismiss();
    };
    __decorate([
        core_1.Input()
    ], CrearcompraPage.prototype, "idProveedor");
    __decorate([
        core_1.Input()
    ], CrearcompraPage.prototype, "idCompra");
    __decorate([
        core_1.Input()
    ], CrearcompraPage.prototype, "listaBultosEdit");
    __decorate([
        core_1.Input()
    ], CrearcompraPage.prototype, "productoEdit");
    CrearcompraPage = __decorate([
        core_1.Component({
            selector: 'app-crearcompra',
            templateUrl: './crearcompra.page.html',
            styleUrls: ['./crearcompra.page.scss']
        })
    ], CrearcompraPage);
    return CrearcompraPage;
}());
exports.CrearcompraPage = CrearcompraPage;
