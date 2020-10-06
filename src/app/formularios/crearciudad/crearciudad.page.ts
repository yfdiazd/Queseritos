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
  }

}