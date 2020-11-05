import { Component, NgModule, OnInit } from '@angular/core';
import { FBservicesService } from 'src/app/fbservices.service';
import { MenuController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';
import { CreartruequePage } from 'src/app/formularios/creartrueque/creartrueque.page';

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
    this.listadoproveedores();
  }

  listarproveedores() {
    this.listanombres = [];
    this.FB.proveedoresLista.forEach(proveedor => {
      this.listanombres.push({ nombres: proveedor.nombre, id: proveedor.id, cantidad: 0 });
    })
  }

  listadoproveedores() {
    this.listanombres1 = [];
    this.FB.proveedoresLista.forEach(element => {
      this.listanombres1.push((element.nombre + " " + element.apellido))

    })
    return this.listanombres1;

  }
  async irHomeAnticipo(idProveedor, lote) {
    const modal = await this.modalCtrl.create({
      component: CreartruequePage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idProveedor: idProveedor,
        id: 0,
        lote: lote,
        card: "si"
      },
    }); await modal.present();
  }


  async irCardLote(input) {
    this.FB.proveedoresLista.forEach(element => {
      if (element.nombre + " " + element.apellido == input) {
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
            const ordenLotes = this.FB.listaOrdenLotes();
            let loteLocal = [];
            loteLocal = (ordenLotes.slice(ordenLotes.length - 1));
            this.irHomeAnticipo(idProveedor, loteLocal.toString());


            this.navCtrl.navigateForward(["detallelote/", loteLocal.toString(), idProveedor]);
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
