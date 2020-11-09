import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  @Input() apellidoEdit = "";
  @Input() correoEdit = "";
  @Input() direccionEdit = "";
  @Input() idTipoIdentificacionEdit = "";
  @Input() nombreEdit = "";
  @Input() numIndetificacionEdit = "";
  @Input() telefonoEdit = "";
  @Input() id;

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  customAlertOptions: any = {
    header: "Seleccione",
    translucent: true,
  };

  crearProveedor() {
    if (this.id == undefined) {
      console.log("Entro a crear")
      if (this.idTipoIdentificacionEdit == "" || this.numIndetificacionEdit == "" || this.nombreEdit == "" || this.telefonoEdit == "") {
        this.toastCamposRequeridos();
      } else {
        this.FB.crearProveedor(this.idTipoIdentificacionEdit, this.numIndetificacionEdit, this.nombreEdit.toUpperCase(), this.apellidoEdit.toUpperCase(), this.telefonoEdit, this.direccionEdit.toUpperCase(), this.correoEdit.toUpperCase());
        this.modalCtrl.dismiss("true", "actualizar");

      }

    } else {
      console.log("Entro a MODIFICAR---")
      if (this.idTipoIdentificacionEdit == "" || this.numIndetificacionEdit == "" || this.nombreEdit == "" || this.telefonoEdit == "") {
        this.toastCamposRequeridos();
        console.log("No modificaste nada")
      } else {
        this.FB.updateProveedor(this.id, this.idTipoIdentificacionEdit, this.numIndetificacionEdit, this.nombreEdit.toUpperCase(), this.apellidoEdit.toUpperCase(), this.telefonoEdit, this.direccionEdit.toUpperCase(), this.correoEdit.toUpperCase());
        this.modalCtrl.dismiss("true", "actualizar");
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
      duration: 3000
    });
    toast.present();
  }
}

