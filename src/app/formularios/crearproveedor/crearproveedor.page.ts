import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FBservicesService } from "../../fbservices.service";


@Component({
  selector: 'app-crearproveedor',
  templateUrl: './crearproveedor.page.html',
  styleUrls: ['./crearproveedor.page.scss'],
})

export class CrearproveedorPage {
  //variables para crear proveedor
  
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
    private modalCtrl: ModalController
  ) { }



  crearProveedor() {
    if (this.id == undefined) {
      if (this.idTipoIdentificacionEdit == undefined) {
        this.FB.crearProveedor(this.idTipoIdentificacionEdit, this.numIndetificacionEdit,this.nombreEdit, this.apellidoEdit, this.telefonoEdit, this.direccionEdit, this.correoEdit);
        this.modalCtrl.dismiss();
      } else if (this.numIndetificacionEdit == undefined) {
        this.FB.crearProveedor(this.idTipoIdentificacionEdit, this.numIndetificacionEdit,this.nombreEdit, this.apellidoEdit, this.telefonoEdit, this.direccionEdit, this.correoEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.crearProveedor(this.idTipoIdentificacionEdit, this.numIndetificacionEdit, this.nombreEdit, this.apellidoEdit, this.telefonoEdit, this.direccionEdit, this.correoEdit);
        this.modalCtrl.dismiss();
      }
      console.log("Se debebió crear")
    } else {
      this.FB.updateProveedor(this.id, this.idTipoIdentificacionEdit, this.numIndetificacionEdit,this.nombreEdit, this.apellidoEdit, this.telefonoEdit, this.direccionEdit, this.correoEdit);
      // console.log("Se debe modificar")
      this.modalCtrl.dismiss();
    }
  }
  volver() {
    this.modalCtrl.dismiss();
  }
}
