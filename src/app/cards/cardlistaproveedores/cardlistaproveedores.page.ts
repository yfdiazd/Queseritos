import { Component, NgModule, OnInit } from '@angular/core';
import { FBservicesService } from 'src/app/fbservices.service';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-cardlistaproveedores',
  templateUrl: './cardlistaproveedores.page.html',
  styleUrls: ['./cardlistaproveedores.page.scss'],
})


export class CardlistaproveedoresPage implements OnInit {

  listanombres: any[] = [];
  cont: number = 0;
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,

  ) {
    this.listarproveedores();
    this.listanombres;
  }

  ngOnInit() {
  }

  listarproveedores() {
    this.listanombres = [];
    this.FB.proveedoresLista.forEach(element => {
      this.listanombres.push({ id: element.nombre })
      console.log("imprime element2", this.listanombres)
    });
  }


  validarlote: any[];
  irCardLote(input) {
    console.log("Esto es el ID del proveedor", input)
    if (this.validarlote == undefined || this.validarlote == null) {

      this.presentAlertConfirm(input.id);
      //console.log("va a mostrar el pop up", input);
    }
    else {

      this.navCtrl.navigateForward('cardlotes')
      //console.log("va ir a cardlote",  input);
    }
  }

  async presentAlertConfirm(idProveedor) {
    console.log("Esto me envia el proveedor seleccionado", idProveedor)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'El proveedor no tiene asociado lote de compra, ¿Desea crearle un anticipo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('canceló no hace nada');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.navCtrl.navigateForward(["creartrueque/", idProveedor]);
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  buscar(ev: any) {
    console.log("mostrando evento", ev)
    this.listanombres;
    console.log("entro a buscar", this.listanombres)
    const val = ev.target.value;
    console.log("mostrando evento", val)
    if (val && val.trim !== '') {
      this.listanombres = this.listanombres.filter((item) => {
        console.log("mostrando item", item)
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

  }

}
