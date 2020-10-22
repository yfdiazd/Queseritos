import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

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
    private navCtrl: NavController
  ) {
    // this.FB.getProveedorCompra();
    // this.listaPesajesProveedor();
    this.traerTipoQueso();
    this.traerNombre();
    this.traerListaBultos()
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

  traerListaBultos() {
    this.listaBultos = [];
    this.FB.proveedoresLista.forEach(element => {
      this.FB.pesajeCompraLista.forEach(element => {
        this.listaBultos.push(element.bultoLista);
      })
    })
    console.log("esta es la lista de bultos", this.listaBultos);
  }

  objImp: any;
  // listaCards() {
  //   console.log("asdasdasdasdasd ", this.FB.proveedorCompraLiata);
  //   this.FB.proveedorCompraLiata.forEach(element => {
  //     let total = 0;
  //     let totalCosto = 0;
  //     let totalBultos = 0;
  //     let keys = Object.keys(element);
  //     let lotes = element[keys[0]].idProveedor;
  //     keys.forEach(key => {
  //       total += element[key].pesoBultos;
  //       totalBultos += element[key].totalBulto;
  //       totalCosto += element[key].costoTotalCompra;
  //       console.log("Imprimiendo loteeeeeeeeeeeeeee", total);
  //       console.log("Imprimiendo peeeeeeeeeeeeeee", totalBultos);
  //       console.log("Imprimiendo peeeeeeeeeeeeeee", totalCosto);
  //     })

  //     this.objImp = ({
  //       idProvedor: lotes,
  //       bultos: totalBultos,
  //       costo: totalCosto,
  //       peso: total
  //     });
  //     this.listaCard.push(this.objImp);
  //   });
  //   console.log("ListaCard: ", this.listaCard);
  //   return this.listaCard;

  // }

}
