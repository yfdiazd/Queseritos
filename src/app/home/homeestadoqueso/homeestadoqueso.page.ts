import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  ActionSheetController,
  AlertController, 
  ModalController, } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearestadoproductoPage } from 'src/app/formularios/crearestadoproducto/crearestadoproducto.page';

import { __values } from "tslib";

@Component({
  selector: 'app-homeestadoqueso',
  templateUrl: './homeestadoqueso.page.html',
  styleUrls: ['./homeestadoqueso.page.scss'],
})
export class HomeestadoquesoPage implements OnInit {

  constructor(private FB: FBservicesService,
    private actionSheetController: ActionSheetController, public alertController: AlertController,
    private router: Router, public modalController: ModalController) { }

    codigoEstado: string;
    descripcionEstado: string;

  ngOnInit() {
  }

  async editar(cod) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Modificar registro",

      inputs: [
        {
          name: "Codigo",
          type: "text",
          value: cod.codigo,
          placeholder: " Codigo",
        },
        {
          name: "Descripcion",
          type: "text",
          value: cod.descripcion,
          placeholder: "Descripción",          
        },
      ],

      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Modificar",
          handler: data => {

            console.log("data: " , data.values.codigo);
            console.log("Presionó en editar");
          },
        },
      ],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(" Despues del esperar",result);
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
            this.FB.deleteCiudad(lista.id);
          },
        },
      ],
    });

    await alert.present();
  }
  // editarCiudad() {
  //   this.router.navigate(["crearciudad"]);
  //   // this.FB.updateCiudad(this.codigoCiudad, this.descripcionCiudad);
  //   //this.FB.deleteCiudad("1602202142339");

  // }
}
