"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardcompradetalladaPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var cardcompradetallada_routing_module_1 = require("./cardcompradetallada-routing.module");
var cardcompradetallada_page_1 = require("./cardcompradetallada.page");
var cardcompras_page_1 = require("../cardcompras/cardcompras.page");
var CardcompradetalladaPageModule = /** @class */ (function () {
    function CardcompradetalladaPageModule() {
    }
    CardcompradetalladaPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                cardcompradetallada_routing_module_1.CardcompradetalladaPageRoutingModule
            ],
            declarations: [cardcompradetallada_page_1.CardcompradetalladaPage],
            providers: [cardcompras_page_1.CardcomprasPage]
        })
    ], CardcompradetalladaPageModule);
    return CardcompradetalladaPageModule;
}());
exports.CardcompradetalladaPageModule = CardcompradetalladaPageModule;
