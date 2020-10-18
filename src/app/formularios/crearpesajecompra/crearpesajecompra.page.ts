import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FBservicesService } from "../../fbservices.service";
@Component({
  selector: "app-crearpesajecompra",
  templateUrl: "./crearpesajecompra.page.html",
  styleUrls: ["./crearpesajecompra.page.scss"],
})
export class CrearpesajecompraPage implements OnInit {

  public id;
  //Variables para los bultos
  public incremental;
  public peso: any;
  public numbulto: any[] = [1];
  public listaBultos: any[] = [];
  public bultoObj: any = null;
  public contadorPeso: number;
  public fronLista: any[] = ["1"];
  public nuevoRegistro: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService
  ) { }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    console.log(" se recibe id: ", this.id);
    // this.incrementable = this.FB.numBultos;
  }

  removeRegister(index) {
    this.listaBultos.splice(index, 1);
  }

  contador = 1;
  agregarBultoLista() {
    this.fronLista.push(this.nuevoRegistro);

    console.log("PEPEPEEPEPEPEPEPEPE " + this.peso);
    if (this.peso > 0) {
      console.log("Entro al if");

      this.bultoObj = {
        bulto: this.contador,
        peso: this.peso
      };
      console.log("INcremental", this.incremental);
      console.log("Bulto: " + this.bultoObj.bulto);
      console.log("Peso: " + this.bultoObj.peso);
      this.listaBultos.push(this.bultoObj);
      console.log("lista", this.listaBultos);
      this.peso = 0;
      // this.numbulto = (this.numbulto + 1);

    }
    this.contador++;
  }

  eliminarBulto(index) {
    this.listaBultos.splice(index);
  }

  contarPeso() {
    this.contadorPeso = 0;
    this.listaBultos.forEach((element) => {
      console.log("Peso de i: " + element.peso);
      this.contadorPeso = this.contadorPeso + parseInt(element.peso);
    });
    console.log("Total peso: " + this.contadorPeso);
  }

  guardar() {
    this.fronLista.pop();
    this.agregarBultoLista();
    this.contarPeso();
    console.log("Arrayyyyyy lennnnn " + this.listaBultos.length);
    console.log("Peso que enviamos es de " + this.contadorPeso);
    this.FB.agregarPesaje(
      "proveedor",
      "producto",
      this.listaBultos.length,
      this.contadorPeso,
      this.listaBultos
    );
    this.listaBultos = [];
  }
}
