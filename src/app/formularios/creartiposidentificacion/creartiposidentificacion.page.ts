import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service'

@Component({
  selector: 'app-creartiposidentificacion',
  templateUrl: './creartiposidentificacion.page.html',
  styleUrls: ['./creartiposidentificacion.page.scss'],
})
export class CreartiposidentificacionPage implements OnInit {



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

  guardarTipoIdentificacion() {

    if (this.id == undefined) {
      if (this.codigoEdit == "" || this.descripcionEdit == "") {
        this.toastCamposRequeridos();
      } else {
        this.FB.agregarTipoIdentificacion(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();

      }

    } else {

      this.FB.updateTipoIdentificacion(this.id, this.codigoEdit, this.descripcionEdit);

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
