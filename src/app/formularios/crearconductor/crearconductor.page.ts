import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-crearconductor',
  templateUrl: './crearconductor.page.html',
  styleUrls: ['./crearconductor.page.scss'],
})
@NgModule({
  imports: [ReactiveFormsModule]
})

export class CrearconductorPage implements OnInit {

  @Input() apellidosEdit = "";
  @Input() celularEdit = "";
  @Input() id;
  @Input() idTipoIdentificacionEdit = "";
  @Input() nombresEdit = "";
  @Input() numidentificacionEdit = "";

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController

  ) { }

  ngOnInit() {
  }
  customAlertOptions: any = {
    header: "Seleccione",
    translucent: true,
  };
  guardarConductor() {
    console.log("Entro a guardar--->", this.id)
    if (this.id == undefined) {
      console.log("Entro a crear")
      if (this.idTipoIdentificacionEdit == undefined || this.numidentificacionEdit == undefined || this.nombresEdit == undefined || this.celularEdit == undefined) {
        this.toastCamposRequeridos();
      } else {
        this.FB.agregarConductor(this.idTipoIdentificacionEdit, this.numidentificacionEdit, this.nombresEdit.toUpperCase(), this.apellidosEdit.toUpperCase(), this.celularEdit);
        this.modalCtrl.dismiss("true", "actualizar");
      }

    } else {
      console.log("Entro a MODIFICAR--->", this.id)
      if (this.idTipoIdentificacionEdit == "" || this.numidentificacionEdit == "" || this.nombresEdit == "" || this.celularEdit == "") {
        this.toastCamposRequeridos();
        console.log("No modificaste nada")
      } else {
        this.FB.updateConductor(this.id, this.idTipoIdentificacionEdit, this.numidentificacionEdit, this.nombresEdit.toUpperCase(), this.apellidosEdit.toUpperCase(), this.celularEdit);
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
