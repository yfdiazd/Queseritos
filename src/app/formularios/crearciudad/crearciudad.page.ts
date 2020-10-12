import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-crearciudad',
  templateUrl: './crearciudad.page.html',
  styleUrls: ['./crearciudad.page.scss'],
})
export class CrearciudadPage implements OnInit {
  codigoCiudad: string;
  descripcionCiudad: string;
  listaBultos: any[] = [];
  bultoObj: any = null;
  constructor(
    private FB: FBservicesService
  ) { }

  ngOnInit() {
  }

  agregarBultoLista() {

    this.bultoObj = {
      bulto: "1",
      peso: "44"
    };
    console.log("Codddddddd" + this.bultoObj.bulto);
    console.log("pesssssssssssss" + this.bultoObj.peso);
    this.listaBultos.push(this.bultoObj);


  }

  contadorPeso: number;
  contarPeso() {
    this.contadorPeso = 0;
    this.listaBultos.forEach(element => {
      console.log("Peeepepeeeeee" + element.peso);
      this.contadorPeso = (this.contadorPeso + parseInt(element.peso));
    });
    console.log("Ttotal tttttt " + this.contadorPeso);
  }

  guardarCiudad() {
    //this.FB.agregarCiudad(this.codigoCiudad, this.descripcionCiudad);
    this.contarPeso();
    console.log("Arrayyyyyy lennnnn " + this.listaBultos.length);
    console.log("Peso que enviamos es de " + this.contadorPeso)
    this.FB.agregarPesaje("proveedor", "producto", this.listaBultos.length, this.contadorPeso, this.listaBultos);
    this.listaBultos = [];

  }

}
