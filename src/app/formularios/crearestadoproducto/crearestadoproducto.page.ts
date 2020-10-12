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
      if (this.codigoEdit == undefined) {
        this.FB.agregarEstadoProducto(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else if (this.descripcionEdit == undefined) {
        this.FB.agregarEstadoProducto(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.agregarEstadoProducto(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      }
      console.log("Se debebió crear")
    } else {
      this.FB.updateEstadoProducto(this.id, this.codigoEdit, this.descripcionEdit);
      // console.log("Se debe modificar")
      this.modalCtrl.dismiss();
    }
  }
  volver() {
    this.modalCtrl.dismiss();
  }

}
