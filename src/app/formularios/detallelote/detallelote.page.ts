import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ELOOP } from 'constants';
import { AnyTxtRecord } from 'dns';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';
import { LoginPage } from 'src/app/login/login.page';

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


  ngOnInit() {
    let idLote = this.route.snapshot.paramMap.get("id");
    let idProv = this.route.snapshot.paramMap.get("prov");
    this.loteRecibido = idLote;
    this.provRecibido = idProv;
    this.FB.getPesajeLoteProveedor(idProv, idLote)
    console.log("Se recibe lote: ", this.loteRecibido, this.provRecibido);
    this.FB.pesajeLoteProveedorLista.forEach(element => {
      console.log("-----------------*-*-*-*- ", element.anticipos);

    });

    this.traerNombre();
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
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        datos: item,
      },
    }); await modal.present();
  }

}
