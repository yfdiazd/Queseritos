import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AlertController,
  ModalController,

} from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearconductorPage } from 'src/app/formularios/crearconductor/crearconductor.page';
import { __values } from "tslib";
@Component({
  selector: 'app-homeconductores',
  templateUrl: './homeconductores.page.html',
  styleUrls: ['./homeconductores.page.scss'],
})
export class HomeconductoresPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    public alertController: AlertController,
    private router: Router,
    public modalController: ModalController
  ) { }

  nombres: string;
  apellidos: string;
  numIndetificacion: number;
  celular: number;

  ngOnInit() {
  }
  async editarModal(lista) {
    const modal = await this.modalController.create({
      component: CrearconductorPage,
      cssClass: "my-custom-class",
      componentProps: {
        idTipoIdentificacionEdit: lista.idTipoIdentificacion,
        numidentificacionEdit:lista.numIndetificacion,
        nombresEdit:lista.nombres,
        apellidosEdit:lista.apellidos,
        celularEdit:lista.celular,
        id: lista.id

      },
    });
    return await modal.present();
  }
  
  async crearModal() {
    const modal = await this.modalController.create({
      component: CrearconductorPage,
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
    this.modalController.dismiss();
  }



}
