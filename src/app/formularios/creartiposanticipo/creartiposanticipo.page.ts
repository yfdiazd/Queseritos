import { Component, OnInit } from '@angular/core';

import { FBservicesService } from '../../fbservices.service'
@Component({
  selector: 'app-creartiposanticipo',
  templateUrl: './creartiposanticipo.page.html',
  styleUrls: ['./creartiposanticipo.page.scss'],
})
export class CreartiposanticipoPage implements OnInit {
  //variables para guardar el tipo de anticipo
  codigoTipoAnticipo:string;
  descripcionTipoAnticipo:string;

  constructor( 

    private FB:FBservicesService

   ) { }

  ngOnInit() {
  }

  guardarTipoAnticipo(){
    this.FB.agregarTipoAnticipo(this.codigoTipoAnticipo, this.descripcionTipoAnticipo);
  }

}
