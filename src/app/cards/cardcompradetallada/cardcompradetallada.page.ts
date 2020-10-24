import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, PopoverController } from '@ionic/angular';
import { Key } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';
import { ConfirmarpesajePage } from 'src/app/formularios/confirmarpesaje/confirmarpesaje.page';
import { CrearciudadPage } from 'src/app/formularios/crearciudad/crearciudad.page';
import { CrearcompraPage } from 'src/app/formularios/crearcompra/crearcompra.page';
import { HomeciudadesPage } from 'src/app/home/homeciudades/homeciudades.page';
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
  async presentPopover(ev: any) {
    const popover = await this.popover.create({
      component: HomepesajesPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
