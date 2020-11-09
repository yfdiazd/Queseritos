import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: "app-crearciudad",
  templateUrl: "./crearciudad.page.html",
  styleUrls: ["./crearciudad.page.scss"],
})
export class CrearciudadPage implements OnInit {

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
      }
      this.FB.agregarCiudad(this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase());
      this.modalCtrl.dismiss("true", "actualizar");

    } else {
      if (this.codigoEdit == "" || this.descripcionEdit == "") {
        this.toastCamposRequeridos();
      }
      this.FB.updateCiudad(this.id, this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase());
      this.modalCtrl.dismiss("true", "actualizar");
    }
  }

  volver() {
    this.modalCtrl.dismiss();
  }

  async toastCamposRequeridos() {
    const toast = await this.toastController.create({
      message: "Falta diligenciar campos requeridos.",
      cssClass: "toast",
      color: 'warning',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }

 
}
