import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}
  ngOnInit() {}

  
  agregarProducto(){
   
    if (this.id == undefined) {
      if (this.codigoEdit == undefined || this.descripcionEdit == undefined) {
        this.toastCamposRequeridos();
      } else {
        this.FB.crearProdcuto(this.codigoEdit, this.descripcionEdit);
        this.modalCtrl.dismiss();

      }

    } else {
     
        this.FB.updateProdcuto(this.id, this.codigoEdit, this.descripcionEdit);

        this.modalCtrl.dismiss();
      
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
      position: 'top',
      duration: 5000
    });
    toast.present();
  }
   
}
