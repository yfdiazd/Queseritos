import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';
import { HomepesajesPage } from 'src/app/home/homepesajes/homepesajes.page';
import { CrearcompraPage } from '../crearcompra/crearcompra.page';

import { CreartruequePage } from '../creartrueque/creartrueque.page';
import { VistaimgPage } from '../vistaimg/vistaimg.page';

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
   
  ) { }

  public loteRecibido: any;
  public provRecibido: any;
  public nombreProv: any;
  public idcliente: any;
  public loading: any;

  //Lista de anticipos para mostrar de la compra
  dataFront: any[] = [];
  dataFrontDirecta: any[] = [];

  //Controladores para visualizar el segment
  cards_Compras: boolean = true;
  cards_anticipos: boolean = false;
  cards_detalle: boolean = false;
  crearAnticipo: boolean = false;


  ngOnInit() {
    let idLote = this.route.snapshot.paramMap.get("id");
    let idProv = this.route.snapshot.paramMap.get("prov");
    this.loteRecibido = idLote;
    this.provRecibido = idProv;
    this.traerNombre();
    this.traerDataDetallada();
    this.cambiarHoja(true);
  }

 



  cambiarHoja(event) {
    if (event == true) {
      console.log("entro desde onInit");
      this.generarData();
      this.generarDataDirecta();
      this.traerDataDetallada();
    } else {
      console.log("Entro desde el html");
      const valorSegment = event.detail.value;
      if (valorSegment == "ccompras") {
        this.cards_Compras = true;
        this.cards_anticipos = false;
        this.crearAnticipo = false;
        this.cards_detalle = false;
        this.generarData();
        this.generarDataDirecta();
        this.traerDataDetallada();
      } else if (valorSegment == "scompras") {
        this.cards_Compras = false;
        this.cards_anticipos = true;
        this.crearAnticipo = true;
        this.cards_detalle = false;
        this.generarData();
        this.generarDataDirecta();
        this.traerDataDetallada();
      }
      else if (valorSegment == "detalle") {
        this.cards_Compras = false;
        this.cards_anticipos = false;
        this.crearAnticipo = false;
        this.cards_detalle = true;
      } else {
        this.generarData();
        this.generarDataDirecta();
        this.traerDataDetallada();
      }
    }

  }
  listaDataDetallada: any[] = [];
  traerDataDetallada() {
    this.nombreProv = [];
    this.listaDataDetallada = [];

    this.FB.pesajeCompraLista.forEach(pesaje => {
      this.FB.productosLista.forEach(producto => {
        if (pesaje.idProducto == producto.id) {

          this.listaDataDetallada.push({
            anticipos: pesaje.anticipos,
            bultoLista: pesaje.bultoLista,
            costoTotalCompra: pesaje.costoTotalCompra,
            fechaCompra: pesaje.fechaCompra,
            id: pesaje.id,
            idProducto: pesaje.idProducto,
            idProveedor: pesaje.idProveedor,
            lote: pesaje.lote,
            pesoBultos: pesaje.pesoBultos,
            totalBulto: pesaje.totalBulto,
            nompreProducto: producto.descripcion
          })
        }
      })
    })
  }

  async modalConfirmarPesaje(card) {
    this.FB.getInfoCompra(this.provRecibido, card.id, card.lote)
    this.FB.getPesajeConfirmado(this.provRecibido, card.id, card.lote);
    const modal = await this.modalController.create({
      component: HomepesajesPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idCompra: card.id,
        idProv: this.provRecibido,
        lote: card.lote
      },
    });
    console.log("Esto se envia desde detallelote:;", this.provRecibido, card.id, card.lote);
    await modal.present();
  }
  eliminarRegistro(lista) {
    if (lista.anticipos == 0 && lista.costoTotalCompra == 0) {
      this.removeRegister(lista);
    } else {
      this.alertRemove();
    }
  }
  async alertRemove() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No se puede eliminar',
      message: 'El pesaje ya tiene un anticipo y/o un peso confirmado.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  async editarRegistro(card) {
    if (card.costoTotalCompra == 0) {
      console.log("esta es la data a editar", card);
      const modal = await this.modalController.create({
        component: CrearcompraPage,
        cssClass: 'my-custom-class',
        keyboardClose: false,
        backdropDismiss: false,
        componentProps: {
          idProveedor: this.provRecibido,
          idCompra: card.id,
          listaBultosEdit: card.bultoLista,
          productoEdit: card.idProducto
        },
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if (data == "true") {
        this.FB.getPesajeCompra(this.provRecibido, this.loteRecibido);
        this.FB.getProductos();
        this.traerDataDetallada();
        this.FB.getProveedorCompra();
        this.FB.getAnticipoProveedor();
      }
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'No se puede editar',
        message: 'Esta compra ya tiene pesajes confirmados.',
        buttons: ['ACEPTAR']
      });

      await alert.present();
    }
  }

  async generarData() {
    this.dataFront = [];
    let lista = await this.FB.pesajeLoteProveedorLista;
    let productos = await this.FB.productosLista;
    console.log("imprimir lista", lista, "::: y productos", productos);
    lista.forEach(compra => {
      productos.forEach(producto => {
        if (compra.idProducto == producto.id) {
          let sumaAnticipos = 0;
          if (compra.anticipos !== 0) {
            compra.anticipos.forEach(sumaAnt => {
              console.log("Sumando anticipos", sumaAnt.valorAnticipo);
              sumaAnticipos += sumaAnt.valorAnticipo;
            });
          } else {
            sumaAnticipos = 0;
          }
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
            nompreProducto: producto.descripcion,
            valorSumaAnticipos: sumaAnticipos
          })
        }
        else {
          console.log("no entro al generar data");
        }
      })
    })
    console.log("DATAFRONT: ", this.dataFront);
    return this.dataFront;

  }

  sumaAnticiposDirecto = 0;
  async generarDataDirecta() {
    this.dataFrontDirecta = [];
    let lista = await this.FB.anticipoDirectoProveedorLista;
    let productos = await this.FB.tipoAnticipoLista;
    this.sumaAnticiposDirecto = 0;
    lista.forEach(anticipo => {
      productos.forEach(tipoAnt => {
        if (anticipo.idTipoAnticipo == tipoAnt.descripcion) {
          this.sumaAnticiposDirecto += anticipo.valorAnticipo;
          this.dataFrontDirecta.push({
            valorAnticipo: anticipo.valorAnticipo,
            fechaAnticipo: anticipo.fechaAnticipo,
            idPesajeCompra: anticipo.idPesajeCompra,
            idProveedor: anticipo.idProveedor,
            id: anticipo.id,
            nompreProducto: tipoAnt.descripcion
          })
        }
      })
    })
    return this.dataFrontDirecta, this.sumaAnticiposDirecto;

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
            this.FB.getAnticipoDirectoProveedor(this.provRecibido, this.loteRecibido);
            this.cambiarHoja(true);
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
    const { data } = await modal.onWillDismiss();
    console.log("Esperando esto: ", data);
    if (data == "true") {
      console.log("Entro al if: ", data);
      this.cambiarHoja(true);
    }
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
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log("Esperando esto: ", data);
    if (data == "true") {
      console.log("Entro al if: ", data);
      this.cambiarHoja(true);
    }
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
