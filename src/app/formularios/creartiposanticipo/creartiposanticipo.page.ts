import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service'
@Component({
  selector: 'app-creartiposanticipo',
  templateUrl: './creartiposanticipo.page.html',
  styleUrls: ['./creartiposanticipo.page.scss'],
})
export class CreartiposanticipoPage implements OnInit {
  //variables para guardar el tipo de anticipo
 

  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;

  constructor( 

    private FB:FBservicesService,
    private modalCtrl: ModalController

   ) { }

  ngOnInit() {
  }

  guardarTipoAnticipo(){
    if (this.id == undefined) {
      if (this.codigoEdit == undefined) {
        this.FB.agregarTipoAnticipo(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else if (this.descripcionEdit == undefined) {
        this.FB.agregarTipoAnticipo(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.agregarTipoAnticipo(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      }
      console.log("Se debebió crear")
    } else {
      this.FB.updateTipoAnticipo(this.id, this.codigoEdit, this.descripcionEdit);
      // console.log("Se debe modificar")
      this.modalCtrl.dismiss();
    }
  }
  volver() {
    this.modalCtrl.dismiss();
  }

}
