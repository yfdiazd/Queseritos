import { Component, OnInit } from '@angular/core';
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
export class CardcomprasPage implements OnInit {

  pesoacumulado = 200;
  saldodebitototal = 120000000;
  saldocreditotal = 140000000;
  


  public proveedor;
  public listaProveedores: any[];
  public input = { data: [] };
  public idProv;
  public nombres = [];

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.FB.getCompras();
    // this.nombres = [];
    // this.nombres = this.FB.proveedoresLista;
    // console.log("proveedor",this.nombres)
  }
 

  ngOnInit() {
    
  }



  irVender() {
    this.router.navigate(["cardcompras"]);
  }

  irPesajeCompra(card) {
    // this.FB.getNumBultos(card.id);
    this.navCtrl.navigateForward(["crearpesajecompra/", card.id]);
    console.log("ID:", card.id)
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
            this.navCtrl.navigateForward(["crearpesajecompra/", value]);
          }
        }
      ]
    });

    await alert.present();
  }



}

