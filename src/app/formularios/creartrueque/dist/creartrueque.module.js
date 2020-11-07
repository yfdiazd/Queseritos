"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreartruequePageModule = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var creartrueque_routing_module_1 = require("./creartrueque-routing.module");
var creartrueque_page_1 = require("./creartrueque.page");
var CreartruequePageModule = /** @class */ (function () {
    function CreartruequePageModule() {
    }
    CreartruequePageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                creartrueque_routing_module_1.CreartruequePageRoutingModule,
                http_1.HttpClientModule
            ],
            declarations: [creartrueque_page_1.CreartruequePage]
        })
    ], CreartruequePageModule);
    return CreartruequePageModule;
}());
exports.CreartruequePageModule = CreartruequePageModule;
