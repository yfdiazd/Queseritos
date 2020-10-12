import { Component, Input, OnInit } from "@angular/core";
import { ModalController, ToastController } from '@ionic/angular';
import { FBservicesService } from "../../fbservices.service";

@Component({
  selector: "app-crearciudad",
  templateUrl: "./crearciudad.page.html",
  styleUrls: ["./crearciudad.page.scss"],
})
export class CrearciudadPage implements OnInit {
codigoedit = "HOLA MUNDO";
 

  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController) {
  }

  ngOnInit() { }

  guardar() {

    if (this.id == undefined) {
      if (this.codigoEdit == undefined || this.descripcionEdit == undefined) {
        this.toastCamposRequeridos();
      } else {
        this.FB.agregarCiudad(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();

      }

    } else {
     
        this.FB.updateCiudad(this.id, this.codigoEdit, this.descripcionEdit);

        this.modalCtrl.dismiss();
      
    }
  }

  volver() {
    this.modalCtrl.dismiss();
  }

  async toastCamposRequeridos() {
    const toast = await this.toastController.create({
      message: "Los campos codigo y descripión son requeridos",
      cssClass: "toast",
      color: 'warning',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }
}
