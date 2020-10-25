import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { HomepesajesPage } from 'src/app/home/homepesajes/homepesajes.page';

@Component({
  selector: 'app-cardcompradetallada',
  templateUrl: './cardcompradetallada.page.html',
  styleUrls: ['./cardcompradetallada.page.scss'],
})
export class CardcompradetalladaPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private popover: PopoverController
  ) {
    // this.FB.getProveedorCompra();
    // this.listaPesajesProveedor();
    this.FB.getProductos();
    this.traerTipoQueso();
    this.traerNombre();
  }

  //--------------VARIABLES
  public idProveedor;
  // listas
  public tipoQueso: any;
  public nombreProv: any;
  public listaBultos: any;
  public listaBultosCompra: any;
  //Datos consolidados para la visualización
  listaCard: any[] = [];


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idProveedor = id;
    console.log("Se recibe el proveedor: ", this.idProveedor);
    // this.listaCards();
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

  traerNombre() {
    this.nombreProv = [];
    this.FB.proveedoresLista.forEach(element => {
      this.FB.pesajeCompraLista.forEach(element2 => {
        if (element.id == element2.idProveedor) {
          this.nombreProv = element.nombre;
        }
      })
    })
  }
  async presentPopover(card) {
    this.traerlistBulto(card.id);
    const popover = await this.popover.create({
      component: HomepesajesPage,
      cssClass: 'popover_style',
      translucent: true,
      componentProps: {
        idCompra: card.id,
        idProv: card.idProveedor,
        listaBultos: this.listaBultosCompra
      },
    });
    console.log("CARD_:", card.id)
    console.log("CARD_:", this.listaBultosCompra)
    return await popover.present();
  }

  traerlistBulto(id) {
    console.log("IdCompra_:", id)
    this.listaBultosCompra = [];
    this.FB.pesajeCompraLista.forEach(element => {
      if (element.id == id) {
        this.listaBultosCompra.push(element.bultoLista);
        console.log("peso: ", element.bultoLista);
      }
    });
  }

}
