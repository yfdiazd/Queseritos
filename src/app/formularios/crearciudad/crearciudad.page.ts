import { Component, OnInit } from '@angular/core';

import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-crearciudad',
  templateUrl: './crearciudad.page.html',
  styleUrls: ['./crearciudad.page.scss'],
})
export class CrearciudadPage implements OnInit {
  codigoCiudad: string;
  descripcionCiudad: string;

  constructor(
    private FB: FBservicesService

  ) { }

  ngOnInit() {
  }

  guardarCiudad() {
    this.FB.agregarCiudad(this.codigoCiudad, this.descripcionCiudad);

    //this.FB.generarLote();
    //this.FB.agregarPesajeCompra("proveedor", "producto", "1", "30", "estadoOK");
    //this.FB.deleteCiudad("1602202142339");

  }

}
