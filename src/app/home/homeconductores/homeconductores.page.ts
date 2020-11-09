import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,

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
  listaconductores: any[] = [];
  objconductores: any;
  constructor(
    private navCtrl: NavController,
    private FB: FBservicesService,
    public alertController: AlertController,
    private router: Router,
    public modalController: ModalController
  ) {

    this.listarconductores()

  }

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
        numidentificacionEdit: lista.numIndetificacion,
        nombresEdit: lista.nombres,
        apellidosEdit: lista.apellidos,
        celularEdit: lista.celular,
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
      keyboardClose: false,
      backdropDismiss: false,
      header: "Espera",
      message: "¿Esta seguro de eliminar " + lista.nombres + "?",
      buttons: [
        {
          text: "CANCELAR",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "SI",
          handler: () => {
            this.FB.deleteConductor(lista.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async cerrar() {
    this.navCtrl.navigateForward('main-menu');
  }

  listarconductores() {
    this.listaconductores = [];
    this.objconductores = null;
    this.FB.conductoresLista.forEach(element => {
      this.objconductores = ({
        apellidos: element.apellidos,
        celular: element.celular,
        id: element.id,
        idTipoIdentificacion: element.idTipoIdentificacion,
        nombres: element.nombres,
        numIndetificacion: element.numIndetificacion,

      })
      this.listaconductores.push(this.objconductores);

    })
    return this.listaconductores;
  }
  getItems(ev: any) {
    this.listaconductores;
    let val = ev.target.value;
    if (val && val.trim() != '') {

      this.listaconductores = this.listaconductores.filter((item) => {
        return (item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1)

      })

    }

    else if (val == '' || val == undefined) {
      this.listaconductores = this.FB.conductoresLista;
      return this.listaconductores;
    }




  }

}
