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
exports.SaldarPage = void 0;
var core_1 = require("@angular/core");
var SaldarPage = /** @class */ (function () {
    function SaldarPage(FB, modalCtrl, alertController) {
        this.FB = FB;
        this.modalCtrl = modalCtrl;
        this.alertController = alertController;
        this.deuda = false;
        this.deuda2 = false;
        this.cobro = false;
        this.cobro2 = false;
        this.conclusion = false;
        this.conclusion2 = false;
        this.activarBoton = false;
        this.input_saldo = false;
    }
    SaldarPage.prototype.ngOnInit = function () {
        this.validarSaldoGeneral();
        this.validarEstadoSaldoProveedor();
        this.validarConclusion();
        this.FB.getEstadoProveedor(this.idProv);
    };
    SaldarPage.prototype.validarSaldoGeneral = function () {
        if (this.saldoGeneral < 0) {
            this.deuda = true;
            this.tanto = (this.saldoGeneral * -1);
        }
        else if (this.saldoGeneral >= 0) {
            this.cobro = true;
            this.tanto = this.saldoGeneral;
        }
    };
    SaldarPage.prototype.validarEstadoSaldoProveedor = function () {
        if (this.FB.estadoSaldoProveedor < 0) {
            this.deuda2 = true;
            this.tanto2 = (this.FB.estadoSaldoProveedor * -1);
        }
        else if (this.FB.estadoSaldoProveedor > 0) {
            this.cobro2 = true;
            this.tanto2 = this.FB.estadoSaldoProveedor;
        }
    };
    SaldarPage.prototype.validarConclusion = function () {
        var sumado = this.saldoGeneral + this.FB.estadoSaldoProveedor;
        if (sumado < 0 && this.FB.estadoSaldoProveedor !== 0) {
            this.conclusion = true;
            this.sumado = (sumado * -1);
        }
        else if (sumado > 0 && this.FB.estadoSaldoProveedor !== 0) {
            this.conclusion2 = true;
            this.sumado = sumado;
        }
        else if (sumado == 0) {
            this.input_saldo = true;
            this.valor = 0;
            this.activarBoton = true;
        }
    };
    SaldarPage.prototype.guardar = function () {
        var valorEnviar;
        var sumado = this.saldoGeneral + this.FB.estadoSaldoProveedor;
        if (sumado < 0) {
            valorEnviar = (sumado + this.valor);
            console.log("se sumaaaaa es igual ? ", valorEnviar);
        }
        else {
            valorEnviar = (sumado - this.valor);
            console.log("se resta es ifual = ", valorEnviar);
            if (valorEnviar < 0) {
                valorEnviar = (valorEnviar * -1);
            }
        }
        console.log("esto se envia al metodo para saldar ", valorEnviar);
        // this.FB.saldarDeudasProveedor(this.idProv, valorEnviar);
        this.valorMensaje = valorEnviar;
        this.alerta();
        // this.FB.alertaSaldarLote(this.idProv, valorEnviar);
    };
    SaldarPage.prototype.alerta = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Confirmación',
                            message: 'Esta seguro de saldar este lote?',
                            buttons: [
                                {
                                    text: 'Aceptar',
                                    handler: function () {
                                        _this.modalCtrl.dismiss(_this.valorMensaje, "actualizar");
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
    SaldarPage.prototype.permitirGuardar = function (event) {
        console.log("cambiando", this.valor, event);
        if (this.valor == undefined ||
            this.valor == null ||
            this.valor == "" || event == null) {
            this.activarBoton = false;
        }
        else {
            this.activarBoton = true;
        }
    };
    SaldarPage.prototype.volver = function () {
        this.modalCtrl.dismiss();
    };
    __decorate([
        core_1.Input()
    ], SaldarPage.prototype, "idProv");
    __decorate([
        core_1.Input()
    ], SaldarPage.prototype, "creditoGeneral");
    __decorate([
        core_1.Input()
    ], SaldarPage.prototype, "debitoGeneral");
    __decorate([
        core_1.Input()
    ], SaldarPage.prototype, "saldoGeneral");
    SaldarPage = __decorate([
        core_1.Component({
            selector: 'app-saldar',
            templateUrl: './saldar.page.html',
            styleUrls: ['./saldar.page.scss']
        })
    ], SaldarPage);
    return SaldarPage;
}());
exports.SaldarPage = SaldarPage;
