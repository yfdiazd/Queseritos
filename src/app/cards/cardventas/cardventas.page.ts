import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { AgregarvalorventaPage } from 'src/app/formularios/crearenviocliente/agregarvalorventa/agregarvalorventa.page';
import { CrearenvioclientePage } from 'src/app/formularios/crearenviocliente/crearenviocliente.page';
import { VistaimgPage } from 'src/app/formularios/vistaimg/vistaimg.page';

import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-cardventas',
  templateUrl: './cardventas.page.html',
  styleUrls: ['./cardventas.page.scss'],
})
export class CardventasPage implements OnInit {
  // listas
  public tipoQueso: any;
  public nombreCliente: any;
  public listaPesadas: any;
  public listaPesadasVenta: any;
  anofecha: Date = new Date();
  customPickerOptions: any;
  show: boolean = true;
  hiden: boolean = false;
  //Datos consolidados para la visualización
  listaCard: any[] = [];
  //lista de la venta que se recorre en el HTML
  public listaVentas: any[] = [];
  //lista de datos para el front cuando se filtra
  listaFiltrada: any;

  constructor(
    private FB: FBservicesService,
    private modalController: ModalController,
    private PopoverController: PopoverController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }
  flag;
  public idcliente: any;
  public loading: any;
  valueDate; 
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idcliente = id;
    this.presentLoading('Espere...');
    this.traerNombre();
    console.log("Esta es la lista para ver en el front:", this.FB.ventasclienteListaMes);
    this.customPickerOptions = {
      buttons: [{
        text: 'Aceptar',
        handler: (evento) => {
          this.valueDate = evento;
          this.show = false;
          this.hiden = true;
          console.log("imprime event", evento);
          this.getListaFiltrada(evento);
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return true;
        }
      }]
    }


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
    this.traerNombre();
    this.recorriendolista();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  getListaFiltrada(event) {
    this.listaFiltrada = [];
    console.log("evebt fecha filter", event);
    this.FB.ventasclienteLista;
    this.listaFiltrada = this.FB.ventasclienteLista;
    console.log("esoto es la lista filtrada ", this.listaFiltrada);
    let varY = event.year.value
    let varM = event.month.value
    if (varM < 10) {
      varM = ("0" + varM);
    }
    let varym = (varY + "-" + varM);
    console.log("buscador   ---- ", varym);
    if (varym && varym.trim() != '') {

      this.listaFiltrada = this.listaFiltrada.filter((item) => {
        return (item.fechaEnvio.indexOf(varym) > -1);
      })

    } else {
      if (varym == '' || varym == undefined) {
        this.listaFiltrada = this.FB.ventasclienteLista;
        return this.listaFiltrada;
      }
    }
  }
  async irVender(input) {
    // console.log("Se envia este id cliente", this.idcliente);
    // this.navCtrl.navigateForward(["crearenviocliente/", this.idcliente]);

    const modal = await this.modalController.create({
      component: CrearenvioclientePage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idCliente: this.idcliente,
        pesadas: []
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == "true") {

      this.traerNombre();
    }
  }
  recorriendolista() {
    this.FB.ventasclienteListaMes.forEach(element => {
      console.log("elementttttt", element)
    })
  }
  async traerNombre() {
    this.nombreCliente = "";
    this.FB.clientesLista.forEach(element => {
      if (element.id == this.idcliente) {
        this.nombreCliente = element.nombres;
      }
    });
    return this.nombreCliente;
  }
  async agregarValorVenta(lista, card) {
    console.log("lsita:", lista, " y tambien ", card);
    if (lista.valor == 0) {
      
      this.irAgregarValorVenta(lista, card, true);
    } else {
      this.alertAgregarValorVenta(lista, card);
    }
  }
  async alertAgregarValorVenta(lista, card) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación.',
      message: 'La pesada ya tiene un valor asignado, desea cambiarla?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SI',
          handler: () => {
            console.log('Confirm Okay');
            this.irAgregarValorVenta(lista, card, false);
          }
        }
      ]
    });

    await alert.present();
  }
  async irAgregarValorVenta(lista, card, flag) {
    const popover = await this.PopoverController.create({
      component: AgregarvalorventaPage,
      cssClass: 'popover_style',
      translucent: true,
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        dataBulto: lista,
        dataVenta: card,
        flag: flag
      },
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data == "true") {
      this.traerNombre();
      this.recorriendolista();
    }
  }
  async editarRegistro(card) {
    console.log("card editar: ", card);
    const modal = await this.modalController.create({
      component: CrearenvioclientePage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        editar: "true",
        data: card,
        pesoLimite: card.pesoLimite,
        pesoAcumulado: card.pesoEnviado,
        codigociudadEdit: card.ciudad,
        fecha: card.fechaEnvio,
        conductor: card.conductor,
        ciudad: card.ciudad,
        idCliente: card.idCliente,
        placa: card.placa,
        pesadas: card.pesadas
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == "true") {

      this.traerNombre();
    }
  }
  eliminarRegistro(card) {
    this.alertEliminarRegistro(card);
  }
  async alertEliminarRegistro(card) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación.',
      message: 'Esta seguro de eliminar la venta?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SI',
          handler: () => {
            console.log('Confirm Okay');
            this.FB.eliminarVenta(card.idCliente, card.fechaEnvio, card.id);
          }
        }
      ]
    });
    await alert.present();
  }
  
  async verImagen(data) {

    if (data.imagen == "No se adjunto imagen.") {
      this.alertImg()
    } else {
      let foto = await this.FB.getFotoVenta(this.idcliente, data.id);
      console.log("esto es la foto", foto);
      const popover = await this.modalController.create({
        component: VistaimgPage,
        cssClass: 'img_modal',
        keyboardClose: false,
        backdropDismiss: false
      });
      return await popover.present();
    }
  }
  async alertImg() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta.',
      message: 'Para esta venta no se adjuntó imagen.',
      buttons: ['ACEPTAR']
    });

    await alert.present();
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
}
