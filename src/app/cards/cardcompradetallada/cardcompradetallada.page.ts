import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
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
    private modalController: ModalController
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
    const modal = await this.modalController.create({
      component: HomepesajesPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idCompra: card.id,
        idProv: card.idProveedor
      },
    });
    return await modal.present();
  }
}
