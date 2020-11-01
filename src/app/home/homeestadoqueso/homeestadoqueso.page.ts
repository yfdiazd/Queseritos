import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearestadoproductoPage } from 'src/app/formularios/crearestadoproducto/crearestadoproducto.page';

import { __values } from "tslib";

@Component({
  selector: 'app-homeestadoqueso',
  templateUrl: './homeestadoqueso.page.html',
  styleUrls: ['./homeestadoqueso.page.scss'],
})
export class HomeestadoquesoPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private FB: FBservicesService,
    public alertController: AlertController,
    private router: Router,
    public modalController: ModalController) { }

  codigoEstado: string;
  descripcionEstado: string;

  ngOnInit() {
  }

  async editarModal(lista) {
    const modal = await this.modalController.create({
      component: CrearestadoproductoPage,
      cssClass: "my-custom-class",
      componentProps: {
        codigoEdit: lista.codigo,
        descripcionEdit: lista.descripcion,
        id: lista.id,
      },
    });
    return await modal.present();
  }
  async crearModal() {
    const modal = await this.modalController.create({
      component: CrearestadoproductoPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async eliminar(lista) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      keyboardClose: false,
      backdropDismiss: false,
      header: "Espera",
      message: "¿Esta seguro de eliminar " + lista.descripcion + "?",
      buttons: [
        {
          text: "CANCELAR",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "SI",
          handler: () => {
            console.log("Confirm Okay");
            this.FB.deleteEstadoProducto(lista.id);
          },
        },
      ],
    });

    await alert.present();
  }
  async cerrar() {
    this.navCtrl.navigateForward('main-menu');
  }
}
