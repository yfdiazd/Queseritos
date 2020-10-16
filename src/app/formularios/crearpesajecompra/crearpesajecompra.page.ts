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

  numbulto = 0;
  peso: number = 0;


  nuevoRegistro: any[] = [];

  incrementable: any[];
  id;
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService
  ) { }
  //Variables para los bultos
  fronLista: any[] = ["1"];
  listaBultos: any[] = [];
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

  removeRegister(index) {
    this.listaBultos.splice(index, 1);
  }

  cotnador = 1;
  agregarBultoLista() {
    this.fronLista.push(this.nuevoRegistro);

    console.log("PEPEPEEPEPEPEPEPEPE " + this.peso);
    if (this.peso > 0) {
      console.log("Entro al if");
      
      this.bultoObj = {
        bulto: this.cotnador,
        peso: this.peso
      };
      console.log("Codddddddd" + this.bultoObj.bulto);
      console.log("pesssssssssssss" + this.bultoObj.peso);

      this.listaBultos.push(this.bultoObj);
      console.log("lista", this.listaBultos);
      this.peso = 0;
      this.numbulto = (this.numbulto + 1);

    }
    this.cotnador++;
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
    this.fronLista.pop();
    this.agregarBultoLista();
    this.contarPeso();
    console.log("Arrayyyyyy lennnnn " + this.listaBultos.length);
    console.log("Peso que enviamos es de " + this.contadorPeso)
    this.FB.agregarPesaje("proveedor", "producto", this.listaBultos.length, this.contadorPeso, this.listaBultos);
    this.listaBultos = [];
  }

}
