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

  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  listanombres: any[];
  cont: number = 0;

  ngOnInit() {
    this.FB.getProveedoresCompra();
    this.listarproveedores();
  }

  listarproveedores() {
    this.listanombres = [];
    this.FB.proveedoresLista.forEach(proveedor => {
      //   console.log("Este es el proveedor a recorrer", proveedor.nombre, " - ", proveedor.id);
      //   // this.FB.proveedoresCompraLista.forEach(lotesExistentes => {
      //   //   console.log("Este es el proveedor que tiene lote", lotesExistentes);
      //   //   // this.FB.getLotesDelProveedor(proveedor.id);
      //   if (this.FB.proveedoresCompraLista.includes(proveedor.id)) {
      //     console.log("Si tiene lote", proveedor.nombre);
      //     this.listanombres.push({ nombres: proveedor.nombre, id: proveedor.id, cantidad: lotesExistentes.length })
      //   } else {
      //     console.log("No tiene lote", proveedor.nombre);
      //   }
      // })
      this.listanombres.push({ nombres: proveedor.nombre, id: proveedor.id, cantidad: 0 });
    })
  }



  // enviarProveedor(dato) {
  //   console.log("dato.id: ", dato.nombre);

  // }

  async irCardLote(input) {
    if (this.FB.proveedoresCompraLista.includes(input.id)) {
      console.log("Se envia el id: ", input.id)
      this.FB.getLotesDelProveedor(input.id);
      this.navCtrl.navigateForward(['cardlotes/', input.id]);
    }
    else {
      console.log("Se envia a crear el id: ", input.id)
      this.presentAlertConfirm(input.id);
    }
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
