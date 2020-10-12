import { Component, OnInit } from '@angular/core';

import { FBservicesService } from '../../fbservices.service'
@Component({
  selector: 'app-creartipostrueque',
  templateUrl: './creartipostrueque.page.html',
  styleUrls: ['./creartipostrueque.page.scss'],
})
export class CreartipostruequePage implements OnInit {
  //variables para guardar el tipo de trueque
  codigoTipoTrueque: string;
  descripcionTipoTrueque: string;

  constructor(
    private FB: FBservicesService
  ) { }

  ngOnInit() {
  }

  guardarTipoTrueque() {
   
  }
}
