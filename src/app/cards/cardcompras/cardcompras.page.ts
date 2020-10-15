import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService } from 'src/app/fbservices.service';
import { AlertController } from '@ionic/angular';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage {
  public pesolimite = "500";
  public pesoacumulado = "300";
  saldodebitototal = "120000000";
  saldocreditotal = "160100000";
  pestotoalcomprado = "300";

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController
<<<<<<< HEAD
  ) { }
=======
  ) {
    this.FB.getCompras();
   }
>>>>>>> 4c76f385eceb796e43518d9541ff642472c7f196

  irVender() {
    this.router.navigate(["cardcompras"]);
  }

<<<<<<< HEAD
  irPesajeCompra() {
    this.navCtrl.navigateForward(["crearpesajecompra"]);
=======
  irPesajeCompra(card) {
    this.FB.getNumBultos(card.id);
    this.navCtrl.navigateForward(["crearpesajecompra/",card.id]);
    console.log("ID:", card.id)
>>>>>>> 4c76f385eceb796e43518d9541ff642472c7f196
  }

  irCompraDetallada() {
    this.navCtrl.navigateForward(["cardcompradetallada"]);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que deseas hacer?',
      cssClass: 'my-custom-class',
      mode: 'md',
      buttons: [{
        text: 'Agregar proveedor',
        icon: 'person-add',
        handler: () => {
          // this.presentAlertRadio();
          var elemento = document.getElementById("select-alert");
          elemento.click();
        }
      }, {
        text: 'Distribuir pesos',
        icon: 'podium',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Quitar compra',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  customAlertOptions: any = {
    header: 'Seleccione proveedor',
    translucent: true,
  };

}

