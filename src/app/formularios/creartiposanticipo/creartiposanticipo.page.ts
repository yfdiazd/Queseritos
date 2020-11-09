import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service'
@Component({
  selector: 'app-creartiposanticipo',
  templateUrl: './creartiposanticipo.page.html',
  styleUrls: ['./creartiposanticipo.page.scss'],
})
export class CreartiposanticipoPage implements OnInit {


  @Input() codigoEdit = "";
  @Input() descripcionEdit = "";
  @Input() id;

  constructor(

    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController

  ) { }

  ngOnInit() {
  }

  guardarTipoAnticipo() {

    if (this.id == undefined) {
      if (this.codigoEdit == "" || this.descripcionEdit == "") {
        this.toastCamposRequeridos();
      } else {
        this.FB.agregarTipoAnticipo(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();

      }

    } else {

      this.FB.updateTipoAnticipo(this.id, this.codigoEdit, this.descripcionEdit);

      this.modalCtrl.dismiss();

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
      duration: 3000
    });
    toast.present();
  }

}
