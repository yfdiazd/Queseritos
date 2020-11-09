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
exports.HomeproveedoresPage = void 0;
var core_1 = require("@angular/core");
var crearproveedor_page_1 = require("src/app/formularios/crearproveedor/crearproveedor.page");
var HomeproveedoresPage = /** @class */ (function () {
    function HomeproveedoresPage(navCtrl, FB, alertController, modalController) {
        this.navCtrl = navCtrl;
        this.FB = FB;
        this.alertController = alertController;
        this.modalController = modalController;
        this.listanomproveedores = [];
    }
    HomeproveedoresPage.prototype.ngOnInit = function () {
        this.listarnombresproveedores();
    };
    HomeproveedoresPage.prototype.editarModal = function (lista) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: crearproveedor_page_1.CrearproveedorPage,
                            cssClass: "my-custom-class",
                            componentProps: {
                                idTipoIdentificacionEdit: lista.idTipoIdentificacion,
                                numIndetificacionEdit: lista.numIndetificacion,
                                nombreEdit: lista.nombre,
                                apellidoEdit: lista.apellido,
                                telefonoEdit: lista.telefono,
                                direccionEdit: lista.direccion,
                                correoEdit: lista.correo,
                                id: lista.id
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (data == "true") {
                            this.listarnombresproveedores();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeproveedoresPage.prototype.crearModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: crearproveedor_page_1.CrearproveedorPage,
                            cssClass: "my-custom-class"
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (data == "true") {
                            this.listarnombresproveedores();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeproveedoresPage.prototype.eliminar = function (lista) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: "my-custom-class",
                            keyboardClose: false,
                            backdropDismiss: false,
                            header: "Espera",
                            message: "¿Esta seguro de eliminar " + lista.nombre + "?",
                            buttons: [
                                {
                                    text: "CANCELAR",
                                    role: "cancel",
                                    cssClass: "secondary",
                                    handler: function (blah) {
                                        console.log("Confirm Cancel: blah");
                                    }
                                },
                                {
                                    text: "SI",
                                    handler: function () {
                                        console.log("Confirm Okay");
                                        _this.FB.deleteProveedor(lista.id);
                                        _this.listarnombresproveedores();
                                    }
                                },
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
    HomeproveedoresPage.prototype.cerrar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.navCtrl.navigateBack('main-menu');
                return [2 /*return*/];
            });
        });
    };
    HomeproveedoresPage.prototype.listarnombresproveedores = function () {
        var _this = this;
        this.listanomproveedores = [];
        this.objproveedor = null;
        this.FB.proveedoresLista.forEach(function (element) {
            _this.objproveedor = ({
                apellido: element.apellido,
                correo: element.correo,
                direccion: element.direccion,
                id: element.id,
                idTipoIdentificacion: element.idTipoIdentificacion,
                nombre: element.nombre,
                numIndetificacion: element.numIndetificacion,
                telefono: element.telefono
            });
            _this.listanomproveedores.push(_this.objproveedor);
        });
        return this.listanomproveedores;
    };
    HomeproveedoresPage.prototype.getItems = function (ev) {
        this.listanomproveedores;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.listanomproveedores = this.listanomproveedores.filter(function (item) {
                return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else if (val == '' || val == undefined) {
            this.listanomproveedores = this.FB.proveedoresLista;
            return this.listanomproveedores;
        }
    };
    HomeproveedoresPage = __decorate([
        core_1.Component({
            selector: 'app-homeproveedores',
            templateUrl: './homeproveedores.page.html',
            styleUrls: ['./homeproveedores.page.scss']
        })
    ], HomeproveedoresPage);
    return HomeproveedoresPage;
}());
exports.HomeproveedoresPage = HomeproveedoresPage;
