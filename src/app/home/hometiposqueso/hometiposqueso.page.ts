import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
   AlertController,
   ModalController,
   NavController,
  } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearproductoPage } from 'src/app/formularios/crearproducto/crearproducto.page';
@Component({
  selector: 'app-hometiposqueso',
  templateUrl: './hometiposqueso.page.html',
  styleUrls: ['./hometiposqueso.page.scss'],
})
export class HometiposquesoPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private FB: FBservicesService,
    private router: Router,
    public alertController: AlertController,
    public modalController: ModalController
    ) { }

    codigoProducto: string;
    descripcionProducto: string;

  ngOnInit() {
  }
  async editarModal(lista) {
    const modal = await this.modalController.create({
      component: CrearproductoPage,
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
      component: CrearproductoPage,
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

  async cerrar(){
    this.navCtrl.navigateForward('main-menu');
  }
 
}
