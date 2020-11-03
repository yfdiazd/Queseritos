import { Component, NgModule, OnInit } from '@angular/core';
import { FBservicesService } from 'src/app/fbservices.service';
import { MenuController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-cardlistaproveedores',
  templateUrl: './cardlistaproveedores.page.html',
  styleUrls: ['./cardlistaproveedores.page.scss'],
})


export class CardlistaproveedoresPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  listanombres: any[];
  listanombres1: any[];
  cont: number = 0;

  ngOnInit() {
    this.FB.getProveedoresCompra();
    this.listarproveedores();
  }

  listarproveedores() {
    this.listanombres = [];
    this.FB.proveedoresLista.forEach(proveedor => {
      this.listanombres.push({ nombres: proveedor.nombre + " " + proveedor.apellido, id: proveedor.id, cantidad: 0 });
    })
    return this.listanombres;
  }




  async irCardLote(input) {
    this.FB.proveedoresLista.forEach(element => {
      if (element.nombre + " " + element.apellido == input.nombres) {
        if (this.FB.proveedoresCompraLista.includes(element.id)) {
          console.log("Se envia el id: ", element.id)
          this.FB.getLotesDelProveedor(element.id);

          this.navCtrl.navigateForward(['cardlotes/', element.id]);
        }
        else {
          console.log("Se envia a crear el id: ", element.id)
          this.presentAlertConfirm(element.id);
        }
      }
    })

  }



  async presentAlertConfirm(idProveedor) {
    console.log("Esto me envia el proveedor seleccionado", idProveedor)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      keyboardClose: false,
      backdropDismiss: false,
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

  getItems(ev: any) {
    this.listanombres1;
    let val = ev.target.value;
    if (val && val.trim() != '') {

      this.listanombres1 = this.listanombres1.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1)

      })

    }
    else {
      if (val == '' || val == undefined) {
        return this.listadoproveedores();


      }

    }
  }

}
