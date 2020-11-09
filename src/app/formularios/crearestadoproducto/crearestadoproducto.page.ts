import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service'

@Component({
  selector: 'app-crearestadoproducto',
  templateUrl: './crearestadoproducto.page.html',
  styleUrls: ['./crearestadoproducto.page.scss'],
})
export class CrearestadoproductoPage implements OnInit {


  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;

  constructor(

    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController) {
  }

  ngOnInit() { }

  guardarEstadoProducto() {
    if (this.id == undefined) {
      if (this.codigoEdit == undefined || this.descripcionEdit == undefined || this.descripcionEdit == "" || this.codigoEdit == "") {
        this.toastCamposRequeridos();
      } else {
        this.FB.agregarEstadoProducto(this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase());
        this.modalCtrl.dismiss();
      }
    } else {
      if (this.codigoEdit == "" || this.descripcionEdit == "") {
        this.toastCamposRequeridos();
      } else {
        this.FB.updateEstadoProducto(this.id, this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase());
        this.modalCtrl.dismiss();
      }

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
