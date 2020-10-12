import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service'

@Component({
  selector: 'app-crearestadoproducto',
  templateUrl: './crearestadoproducto.page.html',
  styleUrls: ['./crearestadoproducto.page.scss'],
})
export class CrearestadoproductoPage implements OnInit {
  //variables para guardar el estado del producto


  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;

  constructor(

    private FB: FBservicesService,
    private modalCtrl: ModalController) { 
    }

  ngOnInit() {}

  guardarEstadoProducto() {

    if(this.id==undefined){
      if(this.codigoEdit == undefined){
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
