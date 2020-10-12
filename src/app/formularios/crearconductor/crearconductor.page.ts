import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-crearconductor',
  templateUrl: './crearconductor.page.html',
  styleUrls: ['./crearconductor.page.scss'],
})
export class CrearconductorPage implements OnInit {

  @Input() idTipoIdentificacionEdit;
  @Input() numidentificacionEdit;
  @Input() nombresEdit;
  @Input() apellidosEdit;
  @Input() celularEdit;
  @Input() id;

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController

  ) {

  }

  ngOnInit() {
  }
  guardarConductor() {
    if (this.id == undefined) {
      if (this.idTipoIdentificacionEdit == undefined) {
        this.FB.agregarConductor(this.idTipoIdentificacionEdit, this.numidentificacionEdit,this.nombresEdit, this.apellidosEdit, this.celularEdit);
        this.modalCtrl.dismiss();
      } else if (this.numidentificacionEdit == undefined) {
        this.FB.agregarConductor(this.idTipoIdentificacionEdit, this.numidentificacionEdit,this.nombresEdit, this.apellidosEdit, this.celularEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.agregarConductor(this.idTipoIdentificacionEdit, this.numidentificacionEdit, this.nombresEdit, this.apellidosEdit, this.celularEdit);
        this.modalCtrl.dismiss();
      }
      console.log("Se debebió crear")
    } else {
      this.FB.updateConductor(this.id, this.idTipoIdentificacionEdit, this.numidentificacionEdit,this.numidentificacionEdit,this.nombresEdit, this.celularEdit);
      // console.log("Se debe modificar")
      this.modalCtrl.dismiss();
    }
  }
  volver() {
    this.modalCtrl.dismiss();
  }


}
