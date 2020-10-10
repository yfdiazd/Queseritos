import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearclientesPage } from 'src/app/formularios/crearclientes/crearclientes.page';

@Component({
  selector: 'app-homeclientes',
  templateUrl: './homeclientes.page.html',
  styleUrls: ['./homeclientes.page.scss'],
})
export class HomeclientesPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  async crear() {
    const modal = await this.modalController.create({
      component: CrearclientesPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }
  

}
