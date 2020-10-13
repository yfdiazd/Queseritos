import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FBservicesService } from "../../fbservices.service";


@Component({
  selector: 'app-crearproveedor',
  templateUrl: './crearproveedor.page.html',
  styleUrls: ['./crearproveedor.page.scss'],
})
@NgModule({
  imports: [ReactiveFormsModule]
})

export class CrearproveedorPage {
  
  @Input() idTipoIdentificacionEdit;
  @Input() numIndetificacionEdit;
  @Input() nombreEdit;
  @Input() apellidoEdit;
  @Input() telefonoEdit;
  @Input() direccionEdit;
  @Input() correoEdit;
  @Input() id;

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  customAlertOptions: any = {
    header: "Seleccione uno",
    translucent: true,
  };

  crearProveedor() {
    if (this.id == undefined) {
      console.log("Entro a crear")
      if (this.idTipoIdentificacionEdit == undefined || this.numIndetificacionEdit == undefined || this.nombreEdit == undefined || this.telefonoEdit == undefined) {
        this.toastCamposRequeridos();
      } else {
        this.FB.crearProveedor(this.idTipoIdentificacionEdit, this.numIndetificacionEdit, this.nombreEdit, this.apellidoEdit, this.telefonoEdit, this.direccionEdit, this.correoEdit);
        this.modalCtrl.dismiss();
      }

    } else {
      console.log("Entro a MODIFICAR---")
      if (this.idTipoIdentificacionEdit == "" || this.numIndetificacionEdit == "" || this.nombreEdit == "" || this.telefonoEdit == "" ) {
        this.toastCamposRequeridos();
        console.log("No modificaste nada")
      } else {
        this.FB.updateProveedor(this.id, this.idTipoIdentificacionEdit, this.numIndetificacionEdit, this.nombreEdit, this.apellidoEdit, this.telefonoEdit, this.direccionEdit, this.correoEdit);
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
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }
}

