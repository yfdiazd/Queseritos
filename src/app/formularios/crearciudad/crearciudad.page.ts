<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

import { FBservicesService } from '../../fbservices.service';
=======
import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { FBservicesService } from "../../fbservices.service";
>>>>>>> 2ec8e86889704593082776e53b9022a537d2803c

@Component({
  selector: "app-crearciudad",
  templateUrl: "./crearciudad.page.html",
  styleUrls: ["./crearciudad.page.scss"],
})
export class CrearciudadPage implements OnInit {

  codigoCiudad: string;
  descripcionCiudad: string;
<<<<<<< HEAD
  listaBultos: any[] = [];
  bultoObj: any = null;
  constructor(
    private FB: FBservicesService
  ) { }
=======

  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;
>>>>>>> 2ec8e86889704593082776e53b9022a537d2803c

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController) {
  }

<<<<<<< HEAD
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

=======
  ngOnInit() { }

  guardarCiudad() {
    if (this.id == undefined) {
      if (this.codigoCiudad == undefined) {
        this.FB.agregarCiudad(this.codigoEdit, this.descripcionCiudad);
        this.modalCtrl.dismiss();
      } else if (this.descripcionCiudad == undefined) {
        this.FB.agregarCiudad(this.codigoCiudad, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.agregarCiudad(this.codigoCiudad, this.descripcionCiudad);
        this.modalCtrl.dismiss();
      }
      console.log("Se debebió crear")
    } else {
      this.FB.updateCiudad(this.id, this.codigoEdit, this.descripcionCiudad);
      // console.log("Se debe modificar")
      this.modalCtrl.dismiss();
    }
  }
  volver() {
    this.modalCtrl.dismiss();
>>>>>>> 2ec8e86889704593082776e53b9022a537d2803c
  }
}
