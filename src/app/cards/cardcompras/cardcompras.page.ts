import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {
  pesolimite="500";
  pesoacumulado="300";
  saldodebitototal="$1000.000";
  saldocreditotal="$1.500.000";
  pestotoalcomprado="300";
  totalbultos="2";
  constructor(public actionSheetController: ActionSheetController, public alertController: AlertController, private router:Router) { }
  irVender(){
    this.router.navigate(["cardcompras"]);
  }

  ngOnInit() {
  }

  async presentAlertConfirm() 
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Agregar',
        role: 'edit',
        icon: 'add',
        handler: () => {
          console.log('Share clicked');
        }
      }, 
      {
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

}
