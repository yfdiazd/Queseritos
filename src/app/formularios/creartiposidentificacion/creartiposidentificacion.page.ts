import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FBservicesService } from '../../fbservices.service'

@Component({
  selector: 'app-creartiposidentificacion',
  templateUrl: './creartiposidentificacion.page.html',
  styleUrls: ['./creartiposidentificacion.page.scss'],
})
export class CreartiposidentificacionPage implements OnInit {
  
 

  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController

  ) {}

  ngOnInit() {
  }

  guardarTipoIdentificacion() {
    if (this.id == undefined) {
      if (this.codigoEdit == undefined) {
        this.FB.agregarTipoIdentificacion(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else if (this.codigoEdit == undefined) {
        this.FB.agregarTipoIdentificacion(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.agregarTipoIdentificacion(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      }
      console.log("Se debebió crear")
    } else {
      this.FB.updateTipoIdentificacion(this.id, this.codigoEdit, this.descripcionEdit);
      // console.log("Se debe modificar")
      this.modalCtrl.dismiss();
    }
  }
  volver() {
    this.modalCtrl.dismiss();
  }
}
