import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearcompraPage } from 'src/app/formularios/crearcompra/crearcompra.page';

@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {

  public listaProveedores: any[];
  public input = { data: [] };
  public idProv;

  //Variable donde se guarda el lote actual en el que se esta comprando
  loteActual: any;
  //Lista de nombres a mostrar
  public listaDatos: any = [];
  public objProv: any;

  public valorCss: any;
  public loading: any;


  constructor(
    public actionSheetController: ActionSheetController,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private modalController: ModalController

  ) {
    console.log("Esto debe imprimirse siempre. CONSTRUCTOR");
  }
  lastLote = [];
  ngOnInit() {
    this.validacionLote();
    this.FB.getLoteProveedor();
    this.traerNombre();
    this.cambioSaldo();
    this.presentLoading('Espere...');
    this.lastLote = [];
    this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1));
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
    this.lastLote = [];
    this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1));
    this.validacionLote();
    this.FB.getLoteProveedor();
    this.FB.getAnticipoProveedor();
    this.traerNombre();
    this.cambioSaldo();


    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  cambioSaldo() {
    let valor1 = 0;
    let valor2 = 0;

    valor1 = this.FB.saldodebitototal;
    valor2 = this.FB.saldocreditotal;

    if ((valor1 - valor2) < 0) {
      document.getElementById("valorCss").style.color = "crimson";
      document.getElementById("valorCss").style.textShadow = "#500707 1px 1px 1px";

    } else {
      document.getElementById("valorCss").style.color = "lime";
    }
  }
  async traerNombre() {
    this.listaDatos = [];
    this.objProv = null;
    let proveedoresLista = this.FB.proveedoresLista;
    let listaPaVer = this.FB.listaPaVer;
    console.log("Esto se ve: ", proveedoresLista, " y ", listaPaVer);

    proveedoresLista.forEach(element => {
      listaPaVer.forEach(element2 => {
        if (element.id == element2.idProvedor) {
          this.objProv = ({
            nombre: element.nombre + " " + element.apellido,
            idProv: element.id,
            bultos: element2.bultos,
            costo: element2.costo,
            peso: element2.peso,
            debito: element2.debito
          });
          this.listaDatos.push(this.objProv);
        }
      })
    })


    return this.listaDatos;
  }
  //Validación del ultimo lote con el día en que ingresa a cardcompras: Muestra el alert
  async validacionLote() {
    const ordenLotes = await this.FB.listaOrdenLotes();
    this.loteActual = (ordenLotes.slice(this.FB.ultimoLote.length - 1));
    if (this.loteActual.toString().includes(this.FB.fechaActual())) {
    } else {
      this.alertConfirmarNuevoLote();
    }
  }
  async irCompra(card) {
    const modal = await this.modalController.create({
      component: CrearcompraPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idProveedor: card
      },
    });
    await modal.present();
  }
  async irCompraDetallada(card) {
    this.FB.getPesajeCompra(card.idProv,this.lastLote.toString());
    this.navCtrl.navigateForward(["cardcompradetallada/", card.idProv]);
  }
  async opciones() {

    this.input = { data: [] };
    this.listaProveedores = [];
    this.FB.proveedoresLista.forEach(element => {
      let provee = element;
      this.input.data.push({ name: provee.nombre + " " + provee.apellido, type: 'radio', label: provee.nombre, value: provee.id });
    });
    this.alertProveedores();

  }
  async alertProveedores() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Proveedores',
      inputs: this.input.data,
      keyboardClose: false,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.irCompra(value);
          }
        }
      ]
    });

    await alert.present();
  }
  async alertConfirmarNuevoLote() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      header: "El ultimo lote no coincide con la fecha actual",
      subHeader: this.loteActual,
      message: '¿Desea crear un nuevo lote?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.FB.generarLote();
            this.loteActual = (this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1));
          }
        }
      ]
    });

    await alert.present();
  }
  irInicio() {
    this.navCtrl.navigateBack(["main-menu"]);
  }
  irCompras() {
    this.navCtrl.navigateBack(["cardcompras"]);
  }
  irEstado() {
    this.navCtrl.navigateBack(["cardlistaproveedores"]);
  }
}

