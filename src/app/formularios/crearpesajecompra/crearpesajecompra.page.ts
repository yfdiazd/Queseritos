import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FBservicesService } from '../../fbservices.service';
@Component({
  selector: 'app-crearpesajecompra',
  templateUrl: './crearpesajecompra.page.html',
  styleUrls: ['./crearpesajecompra.page.scss'],
})

export class CrearpesajecompraPage implements OnInit {
  proveedor = "fernanda";
  fechcompra = "03/10/2020";
  costopesaje = "$350.000";
<<<<<<< HEAD
  numbulto = 1;
=======

  numbulto = 0;
  peso;


  nuevoRegistro: any[] = [];

  incrementable: any[];
>>>>>>> 746a9908affae26637f82261f70001505aad3d15
  id;
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService
  ) { }
  //Variables para los bultos
  listaBultos: any[] = [];
  nuevoRegistro = [] = [];
  bultoObj: any = null;
  contadorPeso: number;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    // this.incrementable = this.FB.numBultos;
  }

  addRegister() {
    // console.log("INDEX: ", this.listaBultos);
    this.listaBultos.push(this.nuevoRegistro);
    this.nuevoRegistro = [];
  }

<<<<<<< HEAD
=======
  removeRegister(index) {
    this.listaBultos.splice(index, 1);
  }

>>>>>>> 746a9908affae26637f82261f70001505aad3d15
  agregarBultoLista() {

    if (this.peso != "" || this.peso != null || this.peso != undefined) {
      console.log("Entro al if");
      this.bultoObj = {
        bulto: this.numbulto,
        peso: this.peso
      };
      console.log("Codddddddd" + this.bultoObj.bulto);
      console.log("pesssssssssssss" + this.bultoObj.peso);

      this.listaBultos.push(this.bultoObj);
      console.log("lista", this.listaBultos);
      this.peso = "";
      this.numbulto = (this.numbulto + 1);
    }else{
      console.log("El registro esta vacio");
    }
  }
  eliminarBulto(index) {
    this.listaBultos.splice(index);
  }


  contarPeso() {
    this.contadorPeso = 0;
    this.listaBultos.forEach(element => {
      console.log("Peso de i: " + element.peso);
      this.contadorPeso = (this.contadorPeso + parseInt(element.peso));
    });
    console.log("Total peso: " + this.contadorPeso);
  }

  guardar() {
    // this.agregarBultoLista();
    this.contarPeso();
    console.log("Arrayyyyyy lennnnn " + this.listaBultos.length);
    console.log("Peso que enviamos es de " + this.contadorPeso)
    this.FB.agregarPesaje("proveedor", "producto", this.listaBultos.length, this.contadorPeso, this.listaBultos);
    this.listaBultos = [];
  }

}
