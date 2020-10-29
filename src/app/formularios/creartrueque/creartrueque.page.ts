import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-creartrueque',
  templateUrl: './creartrueque.page.html',
  styleUrls: ['./creartrueque.page.scss'],
})
export class CreartruequePage implements OnInit {

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) { }
  // ----------------VARIABLES-------------
  tipoAnticipoEdit: any;
  valor: any;
  selectedFile: File;
  public idCompraRecibida: any;
  public nombreProv: any;

  //--------------------------------------
  @Input() datos;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idCompraRecibida = id;
    console.log("ME enviarón este proveedor", this.idCompraRecibida)
    this.traerNombre();
  }
  // public transform(value: any) {
  //   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  // }

  traerNombre() {
    this.nombreProv = [];
    console.log("Nombre prov", this.datos.idProveedor);

    this.FB.proveedoresLista.forEach(element => {
      if (element.id == this.datos.idProveedor) {
        this.nombreProv = element.nombre;
      }
    })
  }


  guardar() {
    // if (this.id1 == undefined) {
    //   console.log("Entro a crear anticipo")
    //   if (this.tipoAnticipoEdit == undefined || this.valorEdit == undefined) {
    //     this.toastCamposRequeridos();
    //   } else {
    //     this.FB.registrarAnticiposApesajeCompra("1603763143063", "12345", this.tipoAnticipoEdit, this.valorEdit, "image");
    //     this.modalCtrl.dismiss();

    //   }

    // } else {
    //   console.log("Entro a MODIFICAR---")
    //   if (this.tipoAnticipoEdit == "" || this.valorEdit == "") {
    //     this.toastCamposRequeridos();
    //     console.log("No modificaste nada")
    //   } else {
    //     this.FB.registrarAnticiposApesajeCompra("1603763143063", "12345", this.tipoAnticipoEdit, this.valorEdit, "image");
    //     this.modalCtrl.dismiss();
    //   }
    // }
  }

  volver() {
    this.modalCtrl.dismiss();
  }

  async toastCamposRequeridos() {
    const toast = await this.toastController.create({
      message: "Falta diligenciar campos requeridos.",
      cssClass: "toast",
      color: 'warning',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }
}



