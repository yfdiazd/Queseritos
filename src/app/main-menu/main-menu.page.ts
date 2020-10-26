import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';

import { FBservicesService } from '../fbservices.service';

// import { HomeciudadesPage } from '../home/homeciudades/homeciudades.page';
// import { HometipotruequePage } from '../home/hometipotrueque/hometipotrueque.page';
// import { HometiposquesoPage } from '../home/hometiposqueso/hometiposqueso.page';
// import { HometiposidentificacionPage } from '../home/hometiposidentificacion/hometiposidentificacion.page';
// import { HometipoanticipoPage } from '../home/hometipoanticipo/hometipoanticipo.page';
// import { HomeproveedoresPage } from '../home/homeproveedores/homeproveedores.page';
// import { HomeestadoquesoPage } from '../home/homeestadoqueso/homeestadoqueso.page';
// import { HomeconductoresPage } from '../home/homeconductores/homeconductores.page';
// import { HomeclientesPage } from '../home/homeclientes/homeclientes.page';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  public listaProveedores: any[];
  public input = { data: [] };
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router
  ) {
    
  }

  comprar() {
    this.navCtrl.navigateForward('cardcompras');
    this.FB.getProveedorCompra();
    this.FB.getAnticipoProveedor();
  }

  irCardLotes() {
    this.navCtrl.navigateForward('cardlistaproveedores');
  }

  lista() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  cerrarSesion() {
    this.FB.cerrarSesion();
  }

  //Redireccionamiento a las paginas de configuración
  irCiudad() {
    this.navCtrl.navigateForward('homeciudades')
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeciudadesPage,
    //   cssClass: "my-custom-class"
    // });
    // this.modalCtrl.dismiss();
    // return await modal.present();
  }
  irCliente() {
    this.navCtrl.navigateForward('homeclientes');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeclientesPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  irConductor() {
    this.navCtrl.navigateForward('homeconductores');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeconductoresPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  irEstadoQueso() {
    this.navCtrl.navigateForward('homeestadoqueso');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeestadoquesoPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  irProveedor() {
    this.navCtrl.navigateForward('homeproveedores');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeproveedoresPage,
    //   cssClass: "my-custom-class"
    // });
    // this.menu.close('first');
    // return await modal.present();
  }
  irTipoAnticipo() {
    this.navCtrl.navigateForward('hometipoanticipo');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HometipoanticipoPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  irTipoIdentificacion() {
    this.navCtrl.navigateForward('hometiposidentificacion');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HometiposidentificacionPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  irTipoQueso() {
    this.navCtrl.navigateForward('hometiposqueso');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HometiposquesoPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
}
