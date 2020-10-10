import { Component, Input, OnInit } from "@angular/core";
import { ModalController} from '@ionic/angular';
import { FBservicesService } from "../../fbservices.service";

@Component({
  selector: "app-crearciudad",
  templateUrl: "./crearciudad.page.html",
  styleUrls: ["./crearciudad.page.scss"],
})
export class CrearciudadPage implements OnInit {
  
  codigoCiudad: string;
  descripcionCiudad: string;

  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;

  constructor(
    private FB: FBservicesService,
    private modalCtrl:ModalController) {      
    }

  ngOnInit() {}

  guardarCiudad() {
    console.log("ID del dato a editar", this.id);
    console.log("CODIGO" , this.codigoCiudad, " -- descripción " ,this.descripcionCiudad);
    if(this.id == undefined){
      console.log("CODIGO" , this.codigoEdit, this.codigoCiudad, " -- descripción " , this.descripcionEdit, this.descripcionCiudad );
      // this.FB.agregarCiudad(this.codigoCiudad, this.descripcionCiudad);
      console.log("Se debe crear")
    }else{

      console.log("CODIGO" , this.codigoEdit, this.codigoCiudad, " -- descripción " , this.descripcionEdit, this.descripcionCiudad );
      // this.FB.updateCiudad(this.codigoEdit,this.descripcionCiudad);
      console.log("Se debe modificar")
    }
  }
  volver(){
    this.modalCtrl.dismiss();
  }
}
