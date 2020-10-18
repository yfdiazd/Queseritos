import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FBservicesService } from "../../fbservices.service";
@Component({
  selector: "app-crearpesajecompra",
  templateUrl: "./crearpesajecompra.page.html",
  styleUrls: ["./crearpesajecompra.page.scss"],
})
export class CrearpesajecompraPage implements OnInit {

  tipoQueso = "COSTEÑO";
  public numbulto: any[] = ["1"];
  public peso;
  public id;

  constructor(
    private route: ActivatedRoute, 
    private FB: FBservicesService
    ) {
    // this.nombres = this.FB.proveedoresLista;
    // console.log("proveedor", this.nombres);
    // this.nombres.forEach(element => {
    //   if(element.id == this.id){
    //     console.log("Si lo encontro", element.nombre)
    //   }
    //   console.log("No se encontró")
    // });
    
  }
  //Variables para los bultos
  listaBultos: any[] = [];
  bultoObj: any = null;
  contadorPeso: number;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    console.log(" se recibe id: ", this.id);
    // this.incrementable = this.FB.numBultos;
  }

  removeRegister(index) {
    this.listaBultos.splice(index, 1);
  }

  agregarBultoLista() {
    if (this.peso != "" || this.peso != null || this.peso != undefined) {
      console.log("Entro al if");
      this.bultoObj = {
        bulto: this.numbulto,
        peso: this.peso,
      };
      console.log("Bulto" + this.bultoObj.bulto);
      console.log("Peso" + this.bultoObj.peso);

      this.listaBultos.push(this.bultoObj);
      console.log("lista", this.listaBultos);
      this.peso = "";
    } else {
      console.log("El registro esta vacio");
    }
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


    // this.agregarBultoLista();
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