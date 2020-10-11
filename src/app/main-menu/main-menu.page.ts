import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService } from '../fbservices.service';
import { HomeciudadesPage } from '../home/homeciudades/homeciudades.page';
import { HomeclientesPage } from '../home/homeclientes/homeclientes.page';
import { HomeconductoresPage } from '../home/homeconductores/homeconductores.page';
import { HomeestadoquesoPage } from '../home/homeestadoqueso/homeestadoqueso.page';
import { HomeproveedoresPage } from '../home/homeproveedores/homeproveedores.page';
import { HometipoanticipoPage } from '../home/hometipoanticipo/hometipoanticipo.page';
import { HometiposidentificacionPage } from '../home/hometiposidentificacion/hometiposidentificacion.page';
import { HometiposquesoPage } from '../home/hometiposqueso/hometiposqueso.page';
import { HometipotruequePage } from '../home/hometipotrueque/hometipotrueque.page';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {

  constructor(
    private menu: MenuController,
    private router: Router,
    private FB: FBservicesService,
    public modalController: ModalController
  ) { }

  abrirConfiguracion() {
    this.menu.enable(true, 'myMenu');
    this.menu.open('myMenu');
  }

  
  //Redireccionamiento a las paginas de configuración
  async irCiudad() {
    const modal = await this.modalController.create({
      component: HomeciudadesPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irCliente() {
    const modal = await this.modalController.create({
      component: HomeclientesPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irConductor() {
    const modal = await this.modalController.create({
      component: HomeconductoresPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irEstadoQueso() {
    const modal = await this.modalController.create({
      component: HomeestadoquesoPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irProveedor() {
    const modal = await this.modalController.create({
      component: HomeproveedoresPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irTipoAnticipo() {
    const modal = await this.modalController.create({
      component: HometipoanticipoPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irTipoIdentificacion() {
    const modal = await this.modalController.create({
      component: HometiposidentificacionPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irTipoQueso() {
    const modal = await this.modalController.create({
      component: HometiposquesoPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
  async irTipoTrueque() {
    const modal = await this.modalController.create({
      component: HometipotruequePage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }


}
