import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, LoadingController } from '@ionic/angular';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';
import { SaldarPage } from './saldar/saldar.page';

@Component({
  selector: 'app-cardlotes',
  templateUrl: './cardlotes.page.html',
  styleUrls: ['./cardlotes.page.scss'],
})
export class CardlotesPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {

  }
  public nombreProv: any;
  public idProveedorRecibido: any;
  public loading: any;

  public ultimoSaldo;


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idProveedorRecibido = id;
    this.FB.getLotesDelProveedor(this.idProveedorRecibido);
    this.traerNombre();
    this.estadoGeneral();
    this.validarSaldo();
    this.FB.getEstadoProveedor(this.idProveedorRecibido);
    this.ultimoSaldo = this.FB.estadoSaldoProveedor;

    setTimeout(() => {
      this.loading.dismiss();
    }, 1500);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      cssClass: 'cssLoading',
      keyboardClose: false,
      backdropDismiss: false,
      spinner: 'lines',
      translucent: true
    });
    return this.loading.present();
  }

  doRefresh(event) {

    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }


  validarSaldo() {
    if (this.saldoGeneral < 0) {
      document.getElementById("saldo").style.color = "red";
    } else {
      document.getElementById("saldo").style.color = "lime";
    }
  }

  async traerNombre() {
    this.nombreProv = [];
    this.FB.proveedoresLista.forEach(element => {
      if (element.id == this.idProveedorRecibido) {
        this.nombreProv = element.nombre;
      }
    })
  }

  irDetalleLote(item) {
    this.FB.getPesajeLoteProveedor(this.idProveedorRecibido, item.lote);
    this.FB.getAnticipoDirectoProveedor(this.idProveedorRecibido, item.lote);
    this.FB.getPesajeCompra(this.idProveedorRecibido, item.lote);
    this.navCtrl.navigateForward(["detallelote/", item.lote, this.idProveedorRecibido]);
  }

  irInicio() {
    this.navCtrl.navigateBack(["main-menu"]);
  }
  irCompras() {
    this.FB.getProveedorCompra();
    this.FB.getAnticipoProveedor();
    this.navCtrl.navigateBack(["cardcompras"]);
  }
  irEstado() {
    this.navCtrl.navigateBack(["cardlistaproveedores"]);
  }

  creditoGeneral: number;
  debitoGeneral: number;
  saldoGeneral: number;
  estadoGeneral() {
    this.creditoGeneral = 0;
    this.debitoGeneral = 0;
    this.saldoGeneral = 0;
    console.log("this.FB.listaLotesDelProveedor ", this.FB.listaLotesDelProveedor)
    this.FB.listaLotesDelProveedor.forEach(element => {
      this.creditoGeneral += element.compra;
      this.debitoGeneral += element.anticipo;
    });
    this.saldoGeneral = (this.debitoGeneral - this.creditoGeneral);
    console.log("object", this.debitoGeneral, this.creditoGeneral, this.saldoGeneral);
    return this.debitoGeneral, this.creditoGeneral, this.saldoGeneral;
  }

  async saldarLotes() {
    const modal = await this.modalCtrl.create({
      component: SaldarPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idProv: this.idProveedorRecibido,
        creditoGeneral: this.creditoGeneral,
        debitoGeneral: this.debitoGeneral,
        saldoGeneral: this.saldoGeneral
      },
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log("Esperando esto: ", data);
    if (data == "true") {
      console.log("Entro al if: ", data);
      // this.ngOnInit();
      this.navCtrl.navigateBack(["main-menu"]);
      this.FB.eliminarNodoProveedor(this.idProveedorRecibido);
    }
  }

  saldar() { }

}