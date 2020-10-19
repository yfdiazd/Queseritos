import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FBservicesService } from "src/app/fbservices.service";

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.page.html',
  styleUrls: ['./crearproducto.page.scss'],
})
export class CrearproductoPage {

  predeterminado:boolean= false;


  @Input() codigoEdit;
  @Input() descripcionEdit;
  @Input() predeterminada;
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
        this.FB.crearProdcuto(this.codigoEdit, this.descripcionEdit,this.predeterminado);
        this.modalCtrl.dismiss();
      
      }

    } else {
     
        this.FB.updateProdcuto(this.id, this.codigoEdit, this.descripcionEdit, this.predeterminado);

        this.modalCtrl.dismiss();
      
    }
  }

  volver() {
    this.modalCtrl.dismiss();
  }

  change(){
    console.log("imprime valor de predeterminado", this.predeterminado)
    if(this.predeterminado==true)
    {
      //la proxima vez que se llene el formulario desactive el campo
    }

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
