import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.page.html',
  styleUrls: ['./crearproducto.page.scss']
})
export class CrearproductoPage {

  @Input() codigoEdit = "";
  @Input() descripcionEdit = "";
  @Input() defaultEdit = false;
  @Input() id;

  constructor(

    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }
  ngOnInit() { }


  agregarProducto() {

    if (this.id == undefined) {
      if (this.codigoEdit == "" || this.descripcionEdit == "") {
        this.toastCamposRequeridos();
      } else {
        if (this.defaultEdit == true) {
          this.FB.productosLista.forEach(element => {
            if (element.predetermina == true) {
              this.FB.updateProdcuto(element.id, element.codigo, element.descripcion, false);
            }
          });
          this.FB.crearProducto(this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase(), this.defaultEdit);
          this.modalCtrl.dismiss();
        } else {
          this.FB.crearProducto(this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase(), this.defaultEdit);
          this.modalCtrl.dismiss();
        }
      }
    } else {
      if (this.defaultEdit == true) {
        this.FB.productosLista.forEach(element => {
          if (element.predetermina == true) {
            this.FB.updateProdcuto(element.id, element.codigo, element.descripcion, false);
          }
        });
        this.FB.updateProdcuto(this.id, this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase(), this.defaultEdit);
        this.modalCtrl.dismiss();
      } else {
        this.FB.updateProdcuto(this.id, this.codigoEdit.toUpperCase(), this.descripcionEdit.toUpperCase(), this.defaultEdit);
        this.modalCtrl.dismiss();
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
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

}
