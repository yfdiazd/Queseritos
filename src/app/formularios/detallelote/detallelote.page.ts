import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { ELOOP } from 'constants';
import { AnyTxtRecord } from 'dns';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';
import { LoginPage } from 'src/app/login/login.page';

import { CreartruequePage } from '../creartrueque/creartrueque.page';
import { VistaimgPage } from './vistaimg/vistaimg.page';

@Component({
  selector: 'app-detallelote',
  templateUrl: './detallelote.page.html',
  styleUrls: ['./detallelote.page.scss'],
})
export class DetallelotePage implements OnInit {
  Lotenum = "17-10-2020-L1";
  proveedor = "fernanda";
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private modalController: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {


  }

  public loteRecibido: any;
  public provRecibido: any;
  public nombreProv: any;

  //Lista de anticipos para mostrar de la compra


  cards_Compras: boolean = true;
  cards_anticipos: boolean = false;
  crearAnticipo: boolean = false;


  ngOnInit() {
    let idLote = this.route.snapshot.paramMap.get("id");
    let idProv = this.route.snapshot.paramMap.get("prov");
    this.loteRecibido = idLote;
    this.provRecibido = idProv;
    this.traerNombre();
    this.generarData();
    this.generarDataDirecta();
  }

  cambiarHoja(event) {
    const valorSegment = event.detail.value;
    if (valorSegment == "ccompras") {
      this.cards_Compras = true;
      this.cards_anticipos = false;
      this.crearAnticipo = false;
    } else {
      this.cards_Compras = false;
      this.cards_anticipos = true;
      this.crearAnticipo = true;
    }

  }

  dataFront: any;
  async generarData() {
    this.dataFront = [];
    let lista = await this.FB.pesajeLoteProveedorLista;
    let productos = await this.FB.productosLista;
    console.log("lista obtenida", lista);
    lista.forEach(compra => {
      console.log("Esto es los anticipos: ", compra.anticipos);
      productos.forEach(producto => {
        if (compra.idProducto == producto.id) {
          this.dataFront.push({
            anticipos: compra.anticipos,
            bultoLista: compra.bultoLista,
            costoTotalCompra: compra.costoTotalCompra,
            fechaCompra: compra.fechaCompra,
            id: compra.id,
            idProducto: compra.idProducto,
            idProveedor: compra.idProveedor,
            lote: compra.lote,
            pesoBultos: compra.pesoBultos,
            totalBulto: compra.totalBulto,
            nompreProducto: producto.descripcion
          })
        }
      })
    })
    return this.dataFront;

  }
  dataFrontDirecta: any;
  async generarDataDirecta() {
    this.FB.getAnticipoDirectoProveedor(this.provRecibido, this.loteRecibido);
    this.dataFrontDirecta = [];
    let lista = await this.FB.anticipoDirectoProveedorLista;
    let productos = await this.FB.tipoAnticipoLista;
    lista.forEach(anticipo => {
      console.log("Esto es los anticipos: ", anticipo);
      productos.forEach(producto => {
        if (anticipo.idTipoAnticipo == producto.id) {
          this.dataFrontDirecta.push({           
            valorAnticipo: anticipo.valorAnticipo,
            fechaAnticipo: anticipo.fechaAnticipo,
            idPesajeCompra: anticipo.idPesajeCompra,
            idProveedor: anticipo.idProveedor,
            id: anticipo.id,
            nompreProducto: producto.descripcion
          })
        }
      })
    })
    return this.dataFront;

  }
  async verImagen(data) {

    let foto = await this.FB.getFoto(this.provRecibido, data.id);
    console.log("esto es la foto", foto);
    const popover = await this.modalController.create({
      component: VistaimgPage,
      cssClass: 'img_modal',
      keyboardClose: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

  traerNombre() {
    this.nombreProv = [];
    console.log("Nombre prov", this.provRecibido);
    this.FB.proveedoresLista.forEach(element => {
      if (element.id == this.provRecibido) {
        this.nombreProv = element.nombre;
      }
    })
  }

  crearModal(item) {
    // this.navCtrl.navigateForward(['creartrueque/', item.id])
    this.irHomeAnticipo(item);
  }
  async removeRegister(lista) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      message: 'Esta seguro de eliminar el anticipo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SI',
          handler: () => {
            console.log('Confirm Okay', lista);
            this.FB.deleteAnticiposApesajeCompra(lista.idProveedor, lista.idPesajeCompra, lista.id, lista.valorAnticipo, this.loteRecibido);
            this.FB.getPesajeLoteProveedor(this.provRecibido, this.loteRecibido);
            this.FB.getAnticiposLoteProveedor(this.provRecibido, this.loteRecibido);
            this.generarData();
            this.generarDataDirecta();
          }
        }
      ]
    });
    await alert.present();
  }

  async irHomeAnticipo(item) {
    const modal = await this.modalController.create({
      component: CreartruequePage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        datos: item,
      },
    })
    await modal.present();
    this.generarData();
    this.generarDataDirecta();
  }

  async irHomeAnticipo2() {
    const modal = await this.modalController.create({
      component: CreartruequePage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idProveedor: this.provRecibido,
        id: 0,
        lote: this.loteRecibido,
        card: "si"
      },
    }); await modal.present();
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
