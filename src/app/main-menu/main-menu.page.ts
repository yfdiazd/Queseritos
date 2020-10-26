import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService } from '../fbservices.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
export class MainMenuPage implements OnInit {
  public listaProveedores: any[];
  public input = { data: [] };
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit(){
    
  }

  comprar() {
    this.navCtrl.navigateForward('cardcompras');

  }

  irCardLotes() {
    this.navCtrl.navigateForward('cardlistaproveedores');
  }
  irCardListaClientes(){
    this.navCtrl.navigateForward('cardlistaclientes');
  }

  lista() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  cerrarSesion(){
    this.FB.cerrarSesion();
  }

  

  //Redireccionamiento a las paginas de configuración
  async irCiudad() {
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
  async irCliente() {
    this.navCtrl.navigateForward('homeclientes');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeclientesPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  async irConductor() {
    this.navCtrl.navigateForward('homeconductores');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeconductoresPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  async irEstadoQueso() {
    this.navCtrl.navigateForward('homeestadoqueso');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HomeestadoquesoPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  async irProveedor() {
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
  async irTipoAnticipo() {
    this.navCtrl.navigateForward('hometipoanticipo');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HometipoanticipoPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  async irTipoIdentificacion() {
    this.navCtrl.navigateForward('hometiposidentificacion');
    this.menu.enable(true, 'first');
    this.menu.close('first');
    // const modal = await this.modalCtrl.create({
    //   component: HometiposidentificacionPage,
    //   cssClass: "my-custom-class"
    // });
    // return await modal.present();
  }
  async irTipoQueso() {
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
