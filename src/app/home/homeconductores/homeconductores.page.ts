import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
@Component({
  selector: 'app-homeconductores',
  templateUrl: './homeconductores.page.html',
  styleUrls: ['./homeconductores.page.scss'],
})
export class HomeconductoresPage implements OnInit {

  constructor(private FB: FBservicesService,
    private actionSheetController: ActionSheetController,
    private router: Router) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que deseas hacer?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Crear',
        icon: 'person-add',
        handler: () => {
          console.log('Play clicked');
          this.router.navigate(["crearconductor"]);
        }
      }, 
      {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          console.log('Share clicked');
        }
      }, 
      {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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
