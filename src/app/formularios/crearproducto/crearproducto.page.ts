import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FBservicesService } from "src/app/fbservices.service";

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.page.html',
  styleUrls: ['./crearproducto.page.scss'],
})
export class CrearproductoPage {

  

  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() id;

  constructor(

    private FB: FBservicesService,
    private modalCtrl: ModalController
  ) {}
  ngOnInit() {}

  //crearProducto
  agregarProducto(){
    if (this.id == undefined) {
      if (this.codigoEdit == undefined) {
        this.FB.crearProdcuto(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else if (this.descripcionEdit == undefined) {
        this.FB.crearProdcuto(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.crearProdcuto(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();
      }
      console.log("Se debebió crear")
    } else {
      this.FB.updateProdcuto(this.id, this.codigoEdit, this.descripcionEdit);
      // console.log("Se debe modificar")
      this.modalCtrl.dismiss();
    }
  }
  volver() {
    this.modalCtrl.dismiss();
  }
  

}
