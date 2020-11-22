import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ModalController, NavController } from '@ionic/angular';

import { FBservicesService } from '../fbservices.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {
  public listaProveedores: any[];
  public input = { data: [] };
  public loading: any;
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {

  }
  lastLote = [];
  ngOnInit() {    
    this.presentLoading('Espere...');
    // this.FB.getTodo();
    setTimeout(() => {
      this.loading.dismiss();
    }, 1500);
  }
  comprar() {
    let lote = this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1).toString();
    this.FB.getProveedorCompra(lote);
    this.FB.getAnticipoProveedor(lote);
    this.navCtrl.navigateForward('cardcompras');
  }
  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      cssClass: 'cssLoading',
      keyboardClose: false,
      //backdropDismiss: false,
      spinner: 'lines',
      translucent: true
    });
    return this.loading.present();
  }
  irCardLotes() {
    this.navCtrl.navigateForward(["cardlistaproveedores"]);
  }
  irCardListaClientes() {
    this.navCtrl.navigateForward(["cardlistaclientes"]);
  }
  irCardListaProveedores() {
    // this.FB.getTodo();
    this.FB.getProveedores();
    this.navCtrl.navigateForward(["cardlistaproveedores"]);
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
