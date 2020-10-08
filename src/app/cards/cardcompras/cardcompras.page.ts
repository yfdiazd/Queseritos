import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {Router} from '@angular/router';
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
  constructor(public actionSheetController: ActionSheetController, private router:Router) { }
  irVender(){
    this.router.navigate(["cardcompras"]);
  }

  ngOnInit() {
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
