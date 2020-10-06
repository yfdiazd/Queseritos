import { Component, OnInit } from '@angular/core';

import { FBservicesService } from '../../fbservices.service'

@Component({
  selector: 'app-crearestadoproducto',
  templateUrl: './crearestadoproducto.page.html',
  styleUrls: ['./crearestadoproducto.page.scss'],
})
export class CrearestadoproductoPage implements OnInit {
  //variables para guardar el estado del producto
  codigoEstado: string;
  descripcionEstado: string;
  constructor(

    private FB: FBservicesService

  ) { }

  guardarEstadoProducto() {
    this.FB.agregarEstadoProducto(this.codigoEstado, this.descripcionEstado);
  }
  ngOnInit() {
  }


}
