import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { FBservicesService } from "src/app/fbservices.service";
import { CrearciudadPage } from "src/app/formularios/crearciudad/crearciudad.page";
import { __values } from "tslib";
@Component({
  selector: "app-homeciudades",
  templateUrl: "./homeciudades.page.html",
  styleUrls: ["./homeciudades.page.scss"],
})
export class HomeciudadesPage implements OnInit {
  constructor(
    private FB: FBservicesService,
    public alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    public modalController: ModalController
  ) {}

  codigoCiudad: string;
  descripcionCiudad: string;

  ngOnInit() {}

  
  async editarModal(lista) {
    const modal = await this.modalController.create({
      component: CrearciudadPage,
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
      component: CrearciudadPage,
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
