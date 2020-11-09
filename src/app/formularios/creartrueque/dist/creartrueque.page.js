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
exports.CreartruequePage = void 0;
var core_1 = require("@angular/core");
var CreartruequePage = /** @class */ (function () {
    function CreartruequePage(FB, modalCtrl, toastController, route, router) {
        this.FB = FB;
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.route = route;
        this.router = router;
        //   @Pipe({
        //     name: 'thousandsPipe'
        // })
        //--------------------------------------
        // Esta variable es cuando viene de detalle lote
        this.datos = [];
        this.nombreArchLoaded = "Subir Archivo";
    }
    CreartruequePage.prototype.ngOnInit = function () {
        this.traerNombre();
    };
    CreartruequePage.prototype.separador = function (event) {
        var separador = event;
        console.log("imprime separador", separador);
        separador.addEventListener('keyup', function (e) {
            console.log("muestro la entrada del campo valor ", entrada);
            var entrada = e.target.value.split('.').join('');
            entrada = entrada.split('').reverse();
            var salida = [];
            var aux = '';
            console.log("muestro la entrada del campo valor ", entrada);
            var paginador = Math.ceil(entrada.lenght / 3);
            console.log("muestro la paginación ", paginador);
            for (var i = 0; i < paginador; i++) {
                for (var j = 0; j < 3; j++) {
                    if (entrada[j + (i * 3)] != undefined) {
                        aux += entrada[j + (i * 3)];
                    }
                }
                salida.push(aux);
                console.log("muestro la paginación ", aux);
                aux = '';
                e.target.value = salida.join('.').split("").reverse().join('');
            }
        }, false);
    };
    CreartruequePage.prototype.traerNombre = function () {
        var _this = this;
        this.nombreProv = [];
        console.log("antes de validar datosssssssss ", this.card);
        if (this.card == "si") {
            console.log("Nombre prov sin lista", this.idProveedor);
            this.FB.proveedoresLista.forEach(function (element) {
                if (element.id == _this.idProveedor) {
                    _this.nombreProv = element.nombre;
                }
            });
        }
        else {
            console.log("Nombre prov con lista", this.datos.idProveedor);
            this.FB.proveedoresLista.forEach(function (element) {
                if (element.id == _this.datos.idProveedor) {
                    _this.nombreProv = element.nombre;
                }
            });
        }
    };
    CreartruequePage.prototype.subirImg = function (event) {
        var valida = event.target.files[0].type;
        console.log("Fotoo ", valida);
        if (valida.includes("image")) {
            this.imagen = event;
            this.nombreArchLoaded = (this.imagen.target.files[0].name + " fue cargado 100%");
            return this.imagen, this.nombreArchLoaded;
        }
        else {
            this.FB.toastArchivoImagen();
        }
    };
    CreartruequePage.prototype.guardar = function () {
        console.log("imagennnnnnnnnnnnnn ", this.imagen);
        console.log(" esto es ", this.card);
        if (this.card == "si") {
            if (this.idProveedor == null || this.id, this.lote == null || this.tipoAnticipoEdit == null || this.valor == null || this.imagen == undefined) {
                this.FB.toastCamposBlanco();
            }
            console.log("Cuando viene sin compra pepaa ", this.idProveedor, this.id, this.lote);
            this.FB.crearBalanceLote(this.idProveedor, this.lote);
            this.FB.registrarAnticiposApesajeCompra(this.idProveedor, this.id, this.lote, this.tipoAnticipoEdit, this.valor, this.imagen);
            this.FB.getPesajeLoteProveedor(this.datos.idProveedor, this.datos.lote);
            this.FB.getAnticipoDirectoProveedor(this.idProveedor, this.lote);
            this.modalCtrl.dismiss("true", "actualizar");
        }
        else {
            if (this.datos.idProveedor == null || this.datos.id == null || this.datos.lote == null || this.tipoAnticipoEdit == null || this.valor == null || this.imagen == undefined) {
                this.FB.toastCamposBlanco();
            }
            console.log("Cuando viene de detalles pape  ", this.datos);
            this.FB.crearBalanceLote(this.datos.idProveedor, this.datos.lote);
            this.FB.registrarAnticiposApesajeCompra(this.datos.idProveedor, this.datos.id, this.datos.lote, this.tipoAnticipoEdit, this.valor, this.imagen);
            this.FB.getPesajeLoteProveedor(this.datos.idProveedor, this.datos.lote);
            this.FB.getAnticipoDirectoProveedor(this.idProveedor, this.lote);
            this.modalCtrl.dismiss("true", "actualizar");
        }
    };
    CreartruequePage.prototype.volver = function () {
        this.modalCtrl.dismiss();
    };
    CreartruequePage.prototype.toastCamposRequeridos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Falta diligenciar campos requeridos.",
                            cssClass: "toast",
                            color: 'warning',
                            position: 'middle',
                            duration: 5000
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
    ], CreartruequePage.prototype, "datos");
    __decorate([
        core_1.Input()
    ], CreartruequePage.prototype, "idProveedor");
    __decorate([
        core_1.Input()
    ], CreartruequePage.prototype, "id");
    __decorate([
        core_1.Input()
    ], CreartruequePage.prototype, "lote");
    __decorate([
        core_1.Input()
    ], CreartruequePage.prototype, "card");
    CreartruequePage = __decorate([
        core_1.Component({
            selector: 'app-creartrueque',
            templateUrl: './creartrueque.page.html',
            styleUrls: ['./creartrueque.page.scss']
        })
    ], CreartruequePage);
    return CreartruequePage;
}());
exports.CreartruequePage = CreartruequePage;
