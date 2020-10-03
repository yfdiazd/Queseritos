import { Component, OnInit } from '@angular/core';
import { FBservicesService } from "src/app/fbservices.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.page.html',
  styleUrls: ['./crearproducto.page.scss'],
})
export class CrearproductoPage {
  //variables para registrar el producto
  codigoProducto;
  descripcionProducto;

  constructor(
private FB: FBservicesService
  ) {}

agregarProducto(){
  this.FB.crearProdcuto(this.codigoProducto, this.descripcionProducto);
}
  

  //crearProducto
}
