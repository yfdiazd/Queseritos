"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrearventaPage = void 0;
var core_1 = require("@angular/core");
var CrearventaPage = /** @class */ (function () {
    function CrearventaPage(modalCtrl, FB) {
        this.modalCtrl = modalCtrl;
        this.FB = FB;
        this.activarBoton = false;
    }
    CrearventaPage.prototype.ngOnInit = function () {
        this.traerTipoQuesoDefault();
        this.FB.getProductos();
        this.FB.getEstadoProducto();
    };
    CrearventaPage.prototype.volver = function () {
        this.modalCtrl.dismiss();
    };
    CrearventaPage.prototype.permitirGuardar = function (event) {
        console.log("cambiando", this.valor, event);
        if (this.productoDefault == undefined
            || this.estadoQueso == undefined
            || this.productoDefault == null
            || this.estadoQueso == null
            || this.productoDefault == ""
            || this.estadoQueso == ""
            || event == undefined
            || event == null
            || event == ""
            || this.valor <= 0
            || event <= 0) {
            this.activarBoton = false;
        }
        else if (this.valor > 0 || event > 0) {
            this.activarBoton = true;
            console.log("enviara el valor", this.valor);
        }
        else {
            this.activarBoton = false;
        }
    };
    CrearventaPage.prototype.traerTipoQuesoDefault = function () {
        var _this = this;
        if (this.tipoQueso == undefined) {
            this.FB.productosLista.forEach(function (element) {
                if (element.estado == 1 && element.predetermina == true) {
                    _this.productoDefault = null;
                    _this.productoDefault = element.descripcion;
                }
            });
        }
        else {
            this.productoDefault = this.tipoQueso;
        }
    };
    CrearventaPage.prototype.guardar = function () {
        this.listaPesadas = [];
        this.objPesadas = null;
        this.objPesadas = ({
            tipoQueso: this.productoDefault,
            estadoQueso: this.estadoQueso,
            peso: this.valor
        });
        this.listaPesadas.push(this.objPesadas);
        this.modalCtrl.dismiss(this.listaPesadas, "lista");
        console.log("La lista es ", this.listaPesadas);
    };
    CrearventaPage = __decorate([
        core_1.Component({
            selector: 'app-crearventa',
            templateUrl: './crearventa.page.html',
            styleUrls: ['./crearventa.page.scss']
        })
    ], CrearventaPage);
    return CrearventaPage;
}());
exports.CrearventaPage = CrearventaPage;
