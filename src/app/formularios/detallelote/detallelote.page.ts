import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

import { CreartruequePage } from '../creartrueque/creartrueque.page';

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
  listaAnticipos: any[];

  ngOnInit() {
    let idLote = this.route.snapshot.paramMap.get("id");
    let idProv = this.route.snapshot.paramMap.get("prov");
    this.loteRecibido = idLote;
    this.provRecibido = idProv;
    console.log("Se recibe lote: ", this.loteRecibido, this.provRecibido);
    this.traerAnticipos();
    this.traerNombre();

  }

  idPesajeCompra: any;
  listaFront: any[];
  traerAnticipos() {
    this.idPesajeCompra = null;
    this.listaFront = [];
    console.log("this.FB.pesajeLoteProveedorLista", this.FB.pesajeLoteProveedorLista);
    console.log("this.FB.anticiposLoteProveedorLista", this.FB.anticiposLoteProveedorLista);

    this.FB.pesajeLoteProveedorLista.forEach(pesaje => {
      this.FB.anticiposLoteProveedorLista.forEach(anticipo => {
        if (anticipo.idPesajeCompra == pesaje.id) {
          console.log("Si entro", anticipo.idPesajeCompra, " - ", pesaje.id);

          this.idPesajeCompra = ({
            costoTotalCompra: pesaje.costoTotalCompra,
            fechaCompra: pesaje.fechaCompra,
            id: pesaje.id,
            idProducto: pesaje.idProducto,
            idProveedor: pesaje.idProveedor,
            lote: pesaje.lote,
            pesoBultos: pesaje.pesoBultos,
            totalBulto: pesaje.totalBulto,
            pesajes: {
              archivo: anticipo.archivo,
              fechaAnticipo: anticipo.fechaAnticipo,
              id: anticipo.id,
              idPesajeCompra: anticipo.idPesajeCompra,
              idTipoAnticipo: anticipo.idTipoAnticipo,
              valorAnticipo: anticipo.valorAnticipo,
            }
          });
          console.log("Si entro", this.idPesajeCompra);
          this.listaFront.push(this.idPesajeCompra);
          this.idPesajeCompra = null;
        }

      })
    })
    return this.listaFront;
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

  async irHomeAnticipo(item) {
    const modal = await this.modalController.create({
      component: CreartruequePage,
      cssClass: 'my-custom-class',
      componentProps: {
        datos: item,
      },
    });
    return await modal.present();
  }

}
