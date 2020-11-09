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
exports.CrearproveedorPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CrearproveedorPage = /** @class */ (function () {
    function CrearproveedorPage(FB, modalCtrl, toastController) {
        this.FB = FB;
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.apellidoEdit = "";
        this.correoEdit = "";
        this.direccionEdit = "";
        this.idTipoIdentificacionEdit = "";
        this.nombreEdit = "";
        this.numIndetificacionEdit = "";
        this.telefonoEdit = "";
        this.customAlertOptions = {
            header: "Seleccione",
            translucent: true
        };
    }
    CrearproveedorPage.prototype.ngOnInit = function () { };
    CrearproveedorPage.prototype.crearProveedor = function () {
        if (this.id == undefined) {
            console.log("Entro a crear");
            if (this.idTipoIdentificacionEdit == "" || this.numIndetificacionEdit == "" || this.nombreEdit == "" || this.telefonoEdit == "") {
                this.toastCamposRequeridos();
            }
            else {
                this.FB.crearProveedor(this.idTipoIdentificacionEdit, this.numIndetificacionEdit, this.nombreEdit.toUpperCase(), this.apellidoEdit.toUpperCase(), this.telefonoEdit, this.direccionEdit.toUpperCase(), this.correoEdit.toUpperCase());
                this.modalCtrl.dismiss("true", "actualizar");
            }
        }
        else {
            console.log("Entro a MODIFICAR---");
            if (this.idTipoIdentificacionEdit == "" || this.numIndetificacionEdit == "" || this.nombreEdit == "" || this.telefonoEdit == "") {
                this.toastCamposRequeridos();
                console.log("No modificaste nada");
            }
            else {
                this.FB.updateProveedor(this.id, this.idTipoIdentificacionEdit, this.numIndetificacionEdit, this.nombreEdit.toUpperCase(), this.apellidoEdit.toUpperCase(), this.telefonoEdit, this.direccionEdit.toUpperCase(), this.correoEdit.toUpperCase());
                this.modalCtrl.dismiss("true", "actualizar");
            }
        }
    };
    CrearproveedorPage.prototype.volver = function () {
        this.modalCtrl.dismiss();
    };
    CrearproveedorPage.prototype.toastCamposRequeridos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Falta diligenciar campos requeridos.",
                            cssClass: "toast",
                            color: 'warning',
                            position: 'middle',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "apellidoEdit");
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "correoEdit");
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "direccionEdit");
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "idTipoIdentificacionEdit");
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "nombreEdit");
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "numIndetificacionEdit");
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "telefonoEdit");
    __decorate([
        core_1.Input()
    ], CrearproveedorPage.prototype, "id");
    CrearproveedorPage = __decorate([
        core_1.Component({
            selector: 'app-crearproveedor',
            templateUrl: './crearproveedor.page.html',
            styleUrls: ['./crearproveedor.page.scss']
        }),
        core_1.NgModule({
            imports: [forms_1.ReactiveFormsModule]
        })
    ], CrearproveedorPage);
    return CrearproveedorPage;
}());
exports.CrearproveedorPage = CrearproveedorPage;
