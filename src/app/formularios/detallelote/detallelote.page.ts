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
    console.log("Se recibe lote: ", this.loteRecibido, this.provRecibido);

    this.traerNombre();
    this.unirListas();
    this.traerAnticipos()
  }

  listaPesajes: any[];
  objPesajes: any;
  listaAnticipos: any[];
  objAnticipos: any;
  traerAnticipos() {
    this.objPesajes = null;
    this.listaPesajes = [];
    this.listaAnticipos = [];
    this.objAnticipos = null;
    console.log("this.FB.pesajeLoteProveedorLista", this.FB.pesajeLoteProveedorLista);
    console.log("this.FB.anticiposLoteProveedorLista", this.FB.anticiposLoteProveedorLista);

    if (this.FB.pesajeLoteProveedorLista.length > 0) {


      this.FB.pesajeLoteProveedorLista.forEach(pesajes => {
        this.objPesajes = ({
          id: pesajes.id,
          idProveedor: pesajes.idProveedor,
          costoTotalCompra: pesajes.costoTotalCompra,
          fechaCompra: pesajes.fechaCompra,
          idProducto: pesajes.idProducto,
          pesoBultos: pesajes.pesoBultos,
          totalBulto: pesajes.totalBulto
        });
        this.listaPesajes.push(this.objPesajes);
      });
    }

    if (this.FB.anticiposLoteProveedorLista.length > 0) {

      this.FB.anticiposLoteProveedorLista.forEach(anticipos => {
        this.objAnticipos = ({
          fechaAnticipo: anticipos.fechaAnticipo,
          idPesajeCompra: anticipos.idPesajeCompra,
          idTipoAnticipo: anticipos.idTipoAnticipo,
          valorAnticipo: anticipos.valorAnticipo
        });
        this.listaAnticipos.push(this.objAnticipos);
      });
    }

    console.log("Listo las listas meeeeeeeeeeeeeeeeeeeeeeeee ", this.listaPesajes, this.listaAnticipos);
    return this.listaPesajes, this.listaAnticipos;

  }

  listaFront: any[];
  objFront: any;
  async unirListas() {
    let llamarMetodo = await this.traerAnticipos();
    this.listaFront = [];
    this.objFront = null;

    
    if (this.listaAnticipos.length != 0 && this.listaPesajes.length != 0) {
      this.listaPesajes.forEach(pesos => {
        this.listaAnticipos.forEach(ant => {
           
          

        });
      });
    } else if (this.listaPesajes.length != 0 && this.listaFront.length == 0) {
      this.listaPesajes.forEach(element => {
        this.objFront = ({
          id: element.id,
          idProveedor: element.idProveedor,
          costoCompra: element.costoTotalCompra,
          fechaCompra: element.fechaCompra,
          idProducto: element.idProducto,
          pesoBultos: element.pesoBultos,
          totalBultos: element.totalBulto,
          listaAnts: 0
        });
        this.listaFront.push(this.objFront);
      });
    } else if (this.listaAnticipos.length != 0 && this.listaFront.length == 0) {
      this.listaAnticipos.forEach(element => {

        this.objAnticipos = ({
          fechaAnticipo: element.fechaAnticipo,
          idPesajeCompra: element.idPesajeCompra,
          idTipoAnticipo: element.idTipoAnticipo,
          valorAnticipo: element.valorAnticipo
        });
        this.listaAnticipos.push(this.objAnticipos);
      });
    }


    console.log("Los -------------------------------------------> ", this.listaFront, llamarMetodo);
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
