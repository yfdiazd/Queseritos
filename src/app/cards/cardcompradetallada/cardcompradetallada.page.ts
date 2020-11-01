import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
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
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
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
    console.log("pesajeCompraLista", this.FB.pesajeCompraLista)
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

  async traerNombre() {
    const getCompras = await this.FB.getPesajeCompra(this.idProveedor);
    console.log("getCompras:", getCompras);
    console.log("pesajeCompraLista,", this.FB.pesajeCompraLista);
    
    
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
    console.log("se ele envia el proveedor y el id de compra", card.id, this.idProveedor)
    await modal.present();
  }

  irCompra() {
    console.log("Se envia este id proveedor", this.idProveedor);
    this.navCtrl.navigateBack(["crearcompra/", this.idProveedor]);
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
