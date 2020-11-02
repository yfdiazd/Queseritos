import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { HomepesajesPage } from 'src/app/home/homepesajes/homepesajes.page';

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

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idProveedor = id;
    this.FB.getPesajeCompra(this.idProveedor);
    this.FB.getProductos();
    this.traerTipoQueso();
    this.traerNombre();
    console.log("Se recibe el proveedor: ", this.idProveedor);
    console.log("listaParaElFront", this.listaCompras)
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
    this.FB.getInfoCompra(this.idProveedor, card.id)
    this.FB.getPesajeConfirmado(this.idProveedor, card.id);
    const modal = await this.modalController.create({
      component: HomepesajesPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idCompra: card.id,
        idProv: this.idProveedor
      },
    });
    await modal.present();
  }

  irCompra() {
    console.log("Se envia este id proveedor", this.idProveedor);
    this.navCtrl.navigateBack(["crearcompra/", this.idProveedor]);
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
         
            this.FB.deletePesajeCompra(this.idProveedor, lista.id);
          }
        }
      ]
    });
    await alert.present();
  }
  async alertRemove() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restricción',
      message: 'El pesaje ya tiene un anticipo y/o un peso confirmado.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async alertEditar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Esta en desarrollo',
      message: 'Aún no esta disponible esta opción',
      buttons: ['Aceptar']
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
