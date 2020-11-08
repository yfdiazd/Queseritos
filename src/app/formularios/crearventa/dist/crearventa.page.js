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
    };
    CrearventaPage.prototype.volver = function () {
        this.modalCtrl.dismiss();
    };
    CrearventaPage.prototype.permitirGuardar = function (event) {
        console.log("cambiando", this.valor, event);
        if (this.tipoQueso == undefined || this.estadoQueso == undefined || this.valor == undefined ||
            this.tipoQueso == null || this.estadoQueso == null || this.valor == null ||
            this.tipoQueso == "" || this.estadoQueso == "" || this.valor == "" || event == null) {
            this.activarBoton = false;
        }
        else {
            this.activarBoton = true;
        }
    };
    CrearventaPage.prototype.guardar = function () {
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
