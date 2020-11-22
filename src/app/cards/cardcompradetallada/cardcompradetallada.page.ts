import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearcompraPage } from 'src/app/formularios/crearcompra/crearcompra.page';
import { HomepesajesPage } from 'src/app/home/homepesajes/homepesajes.page';

import { CardcomprasPage } from '../cardcompras/cardcompras.page';


@Component({
  selector: 'app-cardcompradetallada',
  templateUrl: './cardcompradetallada.page.html',
  styleUrls: ['./cardcompradetallada.page.scss'],
})
export class CardcompradetalladaPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private modalController: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController,
    public cp: CardcomprasPage
  ) { }

  //--------------VARIABLES
  public idProveedor;
  // listas
  public tipoQueso: any;
  public nombreProv: any;
  public listaBultos: any;
  public listaBultosCompra: any;
  //Datos consolidados para la visualización
  listaCard: any[] = [];
  //lista de la compra que se recorre en el HTML
  public listaCompras: any[] = [];
  lastLote: String;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idProveedor = id;
    this.lastLote = "";
    this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1).toString());
    this.FB.getProductos();
    this.FB.getPesajeCompra(this.idProveedor, this.lastLote);
    this.traerTipoQueso();
    this.traerNombre();
  }
  traerTipoQueso() {
    this.tipoQueso = [];
    this.FB.getProductos();
    this.FB.productosLista.forEach(element => {
      this.FB.pesajeCompraLista.forEach(element2 => {
        if (element.id == element2.idProducto) {
          this.tipoQueso.push({ descripcion: element.descripcion, id: element2.idProducto });
        }
      })
    })
  }
  cantidadConfirmaciones = 0;
  async traerNombre() {
    this.nombreProv = [];
    this.listaCompras = [];
    this.FB.proveedoresLista.forEach(element => {
      this.FB.pesajeCompraLista.forEach(element2 => {
        if (element.id == element2.idProveedor) {
          this.nombreProv = element.nombre;
        }
      })
    })
    this.FB.pesajeCompraLista.forEach(pesaje => {
      this.FB.productosLista.forEach(producto => {
        if (pesaje.idProducto == producto.id) {

          this.listaCompras.push({
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
    this.FB.getInfoCompra(this.idProveedor, card.id, this.lastLote)
    this.FB.getPesajeConfirmado(this.idProveedor, card.id, this.lastLote);
    const modal = await this.modalController.create({
      component: HomepesajesPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idCompra: card.id,
        idProv: this.idProveedor,
        lote: card.lote
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == "true") {
      this.FB.getPesajeCompra(this.idProveedor, this.lastLote);
      this.FB.getPesajeConfirmado(this.idProveedor, card.id, this.lastLote);
      this.FB.getProductos();
      this.traerTipoQueso();
      this.traerNombre();
    }

  }
  async irCompra() {
    const modal = await this.modalController.create({
      component: CrearcompraPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idProveedor: this.idProveedor,
        lote: this.lastLote
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == "true") {
      this.FB.getPesajeCompra(this.idProveedor, this.lastLote);
      this.FB.getProductos();
      this.traerTipoQueso();
      this.traerNombre();
    }
  }
  eliminarRegistro(lista) {
    if (lista.anticipos == 0 && lista.costoTotalCompra == 0) {
      this.removeRegister(lista);
    } else {
      this.alertRemove();
    }
  }
  async removeRegister(lista) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      message: 'Esta seguro de eliminar el pesaje?',
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
            console.log("datos de la lista cuando elimina ", lista);

            this.FB.deletePesajeCompra(this.idProveedor, lista.id, this.lastLote);
            this.FB.getPesajeCompra(this.idProveedor, this.lastLote);
            this.FB.getProveedorCompra(this.lastLote);
            this.FB.getAnticipoProveedor(this.lastLote);
            this.traerTipoQueso();
            this.traerNombre();
          }
        }
      ]
    });
    await alert.present();
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
      console.log("esta es la data a editar", this.idProveedor, card);
      const modal = await this.modalController.create({
        component: CrearcompraPage,
        cssClass: 'my-custom-class',
        keyboardClose: false,
        backdropDismiss: false,
        componentProps: {
          idProveedor: this.idProveedor,
          idCompra: card.id,
          listaBultosEdit: card.bultoLista,
          productoEdit: card.idProducto,
          lote: card.lote
        },
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if (data == "true") {
        this.FB.getPesajeCompra(this.idProveedor, this.lastLote);
        this.FB.getProductos();
        this.FB.getProveedorCompra(this.lastLote);
        this.FB.getAnticipoProveedor(this.lastLote);
        this.traerTipoQueso();
        this.traerNombre();

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
  volver() {
    this.FB.getProveedorCompra(this.lastLote);
    this.FB.getAnticipoProveedor(this.lastLote);
    this.navCtrl.navigateBack(["cardcompras"]);
  }
  irInicio() {
    this.navCtrl.navigateBack(["main-menu"]);
  }
  irCompras() {
    this.FB.getProveedorCompra(this.lastLote);
    this.FB.getAnticipoProveedor(this.lastLote);
    this.navCtrl.navigateBack(["cardcompras"]);
  }
  irEstado() {
    this.navCtrl.navigateBack(["cardlistaproveedores"]);
  }
}
