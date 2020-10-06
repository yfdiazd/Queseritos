import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { FBservicesService } from '../../fbservices.service'

@Component({
  selector: 'app-creartiposidentificacion',
  templateUrl: './creartiposidentificacion.page.html',
  styleUrls: ['./creartiposidentificacion.page.scss'],
})
export class CreartiposidentificacionPage implements OnInit {
  codigoTipoIdentificacion: string;
  descripcionTipoIdentificacion: string;

  constructor(
    private FB: FBservicesService

  ) { }

  ngOnInit() {
  }

  guardarTipoIdentificacion() {
    this.FB.agregarTipoIdentificacion(this.codigoTipoIdentificacion, this.descripcionTipoIdentificacion);
  }
}
