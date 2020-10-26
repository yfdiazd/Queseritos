"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrearpesajecompraPage = void 0;
var core_1 = require("@angular/core");
var CrearpesajecompraPage = /** @class */ (function () {
    // public id: any;
    // //Variables para los bultos
    // public numbulto = 1;
    // public nuevoRegistro: any[] = [];
    // public listaBultos: any[] = [];
    // public bultoObj: any = null;
    // public contadorPeso: number;
    // public tipoQueso;
    // public lote;
    function CrearpesajecompraPage(alertController, route, FB) {
        // this.nombres = this.FB.proveedoresLista;
        // console.log("proveedor", this.nombres);
        // this.nombres.forEach(element => {
        //   if(element.id == this.id){
        //     console.log("Si lo encontro", element.nombre)
        //   }
        //   console.log("No se encontró")
        // });
        this.alertController = alertController;
        this.route = route;
        this.FB = FB;
    }
    CrearpesajecompraPage.prototype.ngOnInit = function () {
        // let id = this.route.snapshot.paramMap.get("id");
        // this.id = id;
        // console.log(" se recibe id: ", this.id);
    };
    CrearpesajecompraPage = __decorate([
        core_1.Component({
            selector: "app-crearpesajecompra",
            templateUrl: "./crearpesajecompra.page.html",
            styleUrls: ["./crearpesajecompra.page.scss"]
        })
    ], CrearpesajecompraPage);
    return CrearpesajecompraPage;
}());
exports.CrearpesajecompraPage = CrearpesajecompraPage;
