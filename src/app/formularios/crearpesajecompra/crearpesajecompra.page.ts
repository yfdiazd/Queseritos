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
  numbulto = 1;
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

    console.log("INDEX: ", this.listaBultos);
    this.listaBultos.push(this.nuevoRegistro);
    this.nuevoRegistro = [];
  }

  agregarBultoLista() {

    this.bultoObj = {
      bulto: "1",
      peso: "30"
    };
    console.log("Codddddddd" + this.bultoObj.bulto);
    console.log("pesssssssssssss" + this.bultoObj.peso);
    this.listaBultos.push(this.bultoObj);
  }
  eliminarBulto(index){
    this.listaBultos.splice(index);
  }

  
  contarPeso() {
    this.contadorPeso = 0;
    this.listaBultos.forEach(element => {
      console.log("Peeepepeeeeee" + element.peso);
      this.contadorPeso = (this.contadorPeso + parseInt(element.peso));
    });
    console.log("Ttotal tttttt " + this.contadorPeso);
  }

  guardarPesaje(){
    this.contarPeso();
    console.log("Arrayyyyyy lennnnn " + this.listaBultos.length);
    console.log("Peso que enviamos es de " + this.contadorPeso)
    this.FB.agregarPesaje("proveedor", "producto", this.listaBultos.length, this.contadorPeso, this.listaBultos);
    this.listaBultos = [];
  }

}
