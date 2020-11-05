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
    function CrearenvioclientePage(FB, modalCtrl, alertController, toastController, route, navCtrl) {
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
        this.pesoAcumulado = 0;
        this.input_limite = false;
        this.nombreArchLoaded = "Subir archivo";
        this.customAlertOptions = {
            header: "Seleccione uno",
            translucent: true,
            keyboardClose: false,
            backdropDismiss: false
        };
        this.customPickerOptions = {
            buttons: [{
                    text: 'Aceptar',
                    handler: function () { return console.log('Clicked Save!'); }
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
        var id = this.route.snapshot.paramMap.get("id");
        console.log("se recibe id solito", id);
        this.idcliente = id;
        console.log("se recibe id listacliente", this.idcliente);
    };
    CrearenvioclientePage.prototype.bloquearInputLimite = function (event) {
        if (event.detail.checked == true) {
            this.input_limite = true;
        }
        else if (event.detail.checked == false) {
            this.input_limite = false;
        }
    };
    CrearenvioclientePage.prototype.removeRegister = function (index) {
        this.listaPesada.splice(index, 1);
    };
    CrearenvioclientePage.prototype.agregarPesoLista = function () {
        this.presentAlertRadio();
    };
    CrearenvioclientePage.prototype.presentAlertRadio = function () {
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
        this.listaPesada.splice(index);
        this.numpesada--;
    };
    CrearenvioclientePage.prototype.edit = function (index) {
        this.listaPesada.forEach(function (element) {
            if (element.index == index) {
                console.log("Si lo encontro", element.peso);
            }
        });
    };
    CrearenvioclientePage.prototype.contarPeso = function () {
        var _this = this;
        this.contadorPeso = 0;
        this.listaPesada.forEach(function (element) {
            console.log("Peso de i: " + element.peso);
            _this.contadorPeso = _this.contadorPeso + parseInt(element.peso);
        });
        console.log("Total peso de los bultos: " + this.contadorPeso);
    };
    CrearenvioclientePage.prototype.agregar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
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
                        return [2 /*return*/];
                }
            });
        });
    };
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
