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
exports.CrearenvioclientePage = void 0;
var core_1 = require("@angular/core");
var crearventa_page_1 = require("../crearventa/crearventa.page");
var CrearenvioclientePage = /** @class */ (function () {
    // pesadas: any[] = [];
    function CrearenvioclientePage(FB, modalCtrl, alertController, toastController, route, navCtrl) {
        var _this = this;
        this.FB = FB;
        this.modalCtrl = modalCtrl;
        this.alertController = alertController;
        this.toastController = toastController;
        this.route = route;
        this.navCtrl = navCtrl;
        this.numpesada = 1;
        this.nuevoRegistro = [];
        this.listaPesada = [];
        this.pesadaObj = null;
        //variables alejo
        // pesoAcumulado = 0;
        this.input_limite = false;
        this.nombreArchLoaded = "Subir archivo";
        this.toggle = false;
        this.customAlertOptions = {
            header: "Seleccione",
            translucent: true,
            keyboardClose: false,
            backdropDismiss: false
        };
        this.btn_guardar = false;
        this.customPickerOptions = {
            buttons: [{
                    text: 'Aceptar',
                    handler: function (fecha) {
                        _this.fecha = fecha.year.text + "-" + fecha.month.text + "-" + fecha.day.text;
                        console.log("fecha", fecha, _this.fecha);
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () {
                        console.log('Clicked Log. Do not Dismiss.');
                        return false;
                    }
                }]
        };
    }
    CrearenvioclientePage.prototype.ngOnInit = function () {
        this.agregarPesoLimite();
        this.validacion();
        this.contarPeso();
    };
    CrearenvioclientePage.prototype.volver = function () {
        this.modalCtrl.dismiss();
    };
    CrearenvioclientePage.prototype.agregarPesoLimite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'alertAddPeso',
                            header: 'Ingrese el peso límite.',
                            keyboardClose: false,
                            backdropDismiss: false,
                            inputs: [
                                {
                                    cssClass: 'inputAddPeso',
                                    name: 'peso',
                                    type: 'number',
                                    value: "",
                                    min: "1"
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Aceptar',
                                    handler: function (value) {
                                        console.log("vlue", value.peso);
                                        if (value.peso == "" || value.peso == null || value.peso < 0 || value.peso == 0 || value.peso == undefined) {
                                            _this.limiteSinIngresar();
                                            _this.toggle = false;
                                            _this.input_limite = false;
                                        }
                                        else {
                                            _this.toggle = true;
                                            _this.input_limite = true;
                                            _this.pesoLimite = value.peso;
                                        }
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
    CrearenvioclientePage.prototype.limiteSinIngresar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'No ingresaste un peso límite',
                            message: 'Por favor agregalo mas tarde',
                            buttons: ['ACEPTAR']
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
    CrearenvioclientePage.prototype.bloquearInputLimite = function (event) {
        if (event.detail.checked == true) {
            this.input_limite = true;
        }
        else if (event.detail.checked == false) {
            this.input_limite = false;
        }
    };
    CrearenvioclientePage.prototype.agregarPesoLista = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            header: 'Crear Pesada ' + (this.listaPesada.length + 1),
                            inputs: [
                                {
                                    name: 'peso',
                                    type: 'tel',
                                    value: 0
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
                                            console.log("El campo peso si se modificó");
                                            _this.pesadaObj = {
                                                peso: value.peso
                                            };
                                            console.log("Bulto: " + _this.pesadaObj.bulto);
                                            console.log("Peso: " + _this.pesadaObj.peso);
                                            _this.listaPesada.push(_this.pesadaObj);
                                            console.log("lista: ", _this.listaPesada);
                                            console.log('Confirm Ok', value);
                                        }
                                        else {
                                            console.log("El peso no fue modificado");
                                        }
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
    CrearenvioclientePage.prototype.eliminarBulto = function (index) {
        this.pesadas.splice(index, 1);
        this.sumarPesoAcumulado();
        this.validarPesos();
    };
    CrearenvioclientePage.prototype.contarPeso = function () {
        var _this = this;
        this.contadorPeso = 0;
        this.pesadas.forEach(function (element) {
            console.log("Peso de i: " + element.peso);
            _this.contadorPeso = _this.contadorPeso + parseInt(element.peso);
        });
        console.log("Total peso de los bultos: " + this.contadorPeso);
    };
    CrearenvioclientePage.prototype.guardar = function () {
        if (this.editar == "true") {
            var pesadaGuardar_1 = [];
            var i_1 = 1;
            var sumaCostoVenta_1 = 0;
            this.pesadas.forEach(function (element) {
                pesadaGuardar_1.push({
                    estadoQueso: element.estadoQueso,
                    peso: element.peso,
                    tipoQueso: element.tipoQueso,
                    valor: element.valor,
                    valorTotal: element.valorTotal,
                    id: i_1++
                });
                console.log("lista recorrida", pesadaGuardar_1);
                pesadaGuardar_1.forEach(function (sumar) {
                    sumaCostoVenta_1 += sumar.valorTotal;
                });
            });
            console.log("data de card", pesadaGuardar_1, " y ", sumaCostoVenta_1, "data", this.idCliente, this.ciudad, this.conductor, this.fecha, pesadaGuardar_1, this.contadorPeso, this.pesoLimite, this.placa.toUpperCase(), this.imagenVenta, sumaCostoVenta_1, this.data.id);
            this.FB.actualizarVenta(this.idCliente, this.ciudad, this.conductor, this.fecha, pesadaGuardar_1, this.contadorPeso, this.pesoLimite, this.placa.toUpperCase(), this.imagenVenta, sumaCostoVenta_1, this.data.id);
            this.modalCtrl.dismiss("true", "actualizar");
        }
        else {
            var pesadaGuardar_2 = [];
            var i_2 = 1;
            this.pesadas.forEach(function (element) {
                pesadaGuardar_2.push({
                    estadoQueso: element.estadoQueso,
                    peso: element.peso,
                    tipoQueso: element.tipoQueso,
                    valor: 0,
                    valorTotal: 0,
                    id: i_2++
                });
                console.log("lista recorrida", pesadaGuardar_2);
            });
            this.FB.agregarVenta(this.idCliente, this.ciudad, this.conductor, this.fecha, pesadaGuardar_2, this.contadorPeso, this.pesoLimite, this.placa.toUpperCase(), "suma");
            this.modalCtrl.dismiss("true", "actualizar");
        }
    };
    CrearenvioclientePage.prototype.agregar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: crearventa_page_1.CrearventaPage,
                            cssClass: 'my-custom-class',
                            keyboardClose: false,
                            backdropDismiss: false,
                            componentProps: {}
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (data != undefined) {
                            console.log("Entro al if: ", data);
                            data.forEach(function (element) {
                                _this.pesadas.push({
                                    estadoQueso: element.estadoQueso,
                                    peso: element.peso,
                                    tipoQueso: element.tipoQueso,
                                    valor: 0,
                                    valorTotal: 0
                                });
                                _this.contarPeso();
                            });
                            console.log("esta es la lista para el front:", this.pesadas);
                            this.sumarPesoAcumulado();
                            this.validacion();
                            this.validarPesos();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CrearenvioclientePage.prototype.sumarPesoAcumulado = function () {
        var _this = this;
        this.pesoAcumulado = 0;
        this.pesadas.forEach(function (pesada) {
            _this.pesoAcumulado += pesada.peso;
        });
        return this.pesoAcumulado;
    };
    CrearenvioclientePage.prototype.validacion = function () {
        if (this.pesadas == undefined) {
            console.log("viene  a crear el compae");
            this.btn_guardar = false;
        }
        else if (this.pesadas.length > 0) {
            this.btn_guardar = true;
        }
    };
    CrearenvioclientePage.prototype.validarPesos = function () {
        if (this.pesoAcumulado >= this.pesoLimite) {
            document.getElementById("pesoAcumulado").style.color = "red";
        }
        else {
            document.getElementById("pesoAcumulado").style.color = "lime";
        }
    };
    CrearenvioclientePage.prototype.subirImg = function (event) {
        this.imagenVenta = event;
        console.log("la imagen en la variable es ", this.imagenVenta);
    };
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "editar");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "data");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "pesoLimite");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "pesoAcumulado");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "codigociudadEdit");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "fecha");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "conductor");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "ciudad");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "idCliente");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "placa");
    __decorate([
        core_1.Input()
    ], CrearenvioclientePage.prototype, "pesadas");
    CrearenvioclientePage = __decorate([
        core_1.Component({
            selector: 'app-crearenviocliente',
            templateUrl: './crearenviocliente.page.html',
            styleUrls: ['./crearenviocliente.page.scss']
        })
    ], CrearenvioclientePage);
    return CrearenvioclientePage;
}());
exports.CrearenvioclientePage = CrearenvioclientePage;
