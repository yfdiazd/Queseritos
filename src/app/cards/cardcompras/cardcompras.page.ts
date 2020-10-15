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
  proveedor;

dinero = 0
  total = 0;
  num = 0;
  calcular(valor) {

    console.log("valor:", valor,"num:", this.num)
    this.total = (valor * this.num);
  }

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
<<<<<<< HEAD
   //this.FB.getCompras();
   }
=======
    this.FB.getCompras();
  }
>>>>>>> 746a9908affae26637f82261f70001505aad3d15

  irVender() {
    this.router.navigate(["cardcompras"]);
  }

  irPesajeCompra(card) {
    // this.FB.getNumBultos(card.id);
<<<<<<< HEAD
    this.navCtrl.navigateForward(["crearpesajecompra/",card.id]);
=======
    this.navCtrl.navigateForward(["crearpesajecompra/", card.id]);
>>>>>>> 746a9908affae26637f82261f70001505aad3d15
    console.log("ID:", card.id)
  }

  irCompraDetallada() {
    this.navCtrl.navigateForward(["cardcompradetallada"]);
  }


  listaProveedores: any[];
  input = { data: [] };

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
          this.input = { data: [] };
          this.listaProveedores = [];
          console.log("this.listaProveedores: ", this.listaProveedores)
          this.FB.proveedoresLista.forEach(element => {
            let provee = element;
            this.input.data.push({ name: provee.nombre, type: 'radio', label: provee.nombre, value: provee.id });
          });
          console.log("Se obtuvo esto_:", this.input);
          this.presentAlertRadio();

          // var elemento = document.getElementById("select-alert");
          // elemento.click();
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

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: this.input.data,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            console.log('Confirm Ok', value);
            this.FB.agregarPesaje(value, "", 0, 0, 0)
          }
        }
      ]
    });

    await alert.present();
  }



}

