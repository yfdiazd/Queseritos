import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController) {
  }

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
  }
}
