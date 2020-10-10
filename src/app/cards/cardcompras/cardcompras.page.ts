import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService } from 'src/app/fbservices.service';
import { AlertController } from '@ionic/angular';
import { element } from 'protractor';
@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {
  public pesolimite = "500";
  public pesoacumulado = "300";
  saldodebitototal = "120000000";
  saldocreditotal = "160100000";
  pestotoalcomprado = "300";
  colorPeso;

  listaP: any[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController

  ) { }

  irVender() {
    this.router.navigate(["cardcompras"]);
  }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que deseas hacer?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Agregar proveedor',
        icon: 'person-add',
        handler: () => {
          console.log('Play clicked');
          this.presentAlertRadio();

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
      header: 'Seleccione proveedor',
      inputs: [
        {
          name: 'hola',
          type: 'radio',
          label: 'Radio 1',
          value: "{{lista.codigo}}",
        }
      ],
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
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


  irPesajeCompra() {
    this.router.navigate(["crearpesajecompra"]);
  }
  irCompraDetallada() {
    this.router.navigate(["cardcompradetallada"]);
  }

}
