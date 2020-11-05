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
  // Esta variable es cuando viene de detalle lote
  @Input() datos: any = [];
  // esta es la variable de cuando viene de carlotes
  @Input() idProveedor;
  @Input() id;
  @Input() lote;
  @Input() card;


  ngOnInit() {
    //console.log("ME enviarón este compra", this.datos.id)
    // console.log("ME enviarón este proveedor", this.datos.idProveedor)
    this.traerNombre();
  }

  // formateador() {
  //   document.getElementById("number").onblur = function () {
  //     this.textontet = parseFloat(this.value.replace(/,/g, ""))
  //       .toFixed(2)
  //       .toString()
  //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  //     document.getElementById("display").value = this.value.replace(/,/g, "")
  //   }
  // }
  // public transform(value: any) {
  //   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  // }

  traerNombre() {

    this.nombreProv = [];
    console.log("antes de validar datosssssssss ", this.card);


    if (this.card == "si") {
      console.log("Nombre prov sin lista", this.idProveedor);

      this.FB.proveedoresLista.forEach(element => {
        if (element.id == this.idProveedor) {
          this.nombreProv = element.nombre;
        }
      });
    } else {
      console.log("Nombre prov con lista", this.datos.idProveedor);

      this.FB.proveedoresLista.forEach(element => {
        if (element.id == this.datos.idProveedor) {
          this.nombreProv = element.nombre;
        }
      });
    }
  }




  imagen: any;
  nombreArchLoaded: string = "Subir Archivo";
  subirImg(event) {
    let valida = event.target.files[0].type;
    console.log("Fotoo ", valida);
    if (valida.includes("image")) {
      this.imagen = event;
      this.nombreArchLoaded = (this.imagen.target.files[0].name + " fue cargado 100%");
      return this.imagen, this.nombreArchLoaded;
    } else {
      this.FB.toastArchivoImagen();
    }

  }


  guardar() {
    console.log("imagennnnnnnnnnnnnn ", this.imagen);
    
    console.log(" esto es ", this.card);
    if (this.card == "si") {
      if (this.idProveedor == null || this.id, this.lote == null || this.tipoAnticipoEdit == null || this.valor == null || this.imagen == undefined) {
        this.FB.toastCamposBlanco();
      }
      console.log("Cuando viene sin compra pepaa ", this.idProveedor, this.id, this.lote);
      this.FB.crearBalanceLote(this.idProveedor, this.lote);
      this.FB.registrarAnticiposApesajeCompra(this.idProveedor, this.id, this.lote, this.tipoAnticipoEdit, this.valor, this.imagen);
      this.modalCtrl.dismiss();
    } else {
      if (this.datos.idProveedor == null || this.datos.id == null || this.datos.lote == null || this.tipoAnticipoEdit == null || this.valor == null || this.imagen == undefined) {
        this.FB.toastCamposBlanco();
      }
      console.log("Cuando viene de detalles pape  ", this.datos);
      this.FB.crearBalanceLote(this.datos.idProveedor, this.datos.lote);
      this.FB.registrarAnticiposApesajeCompra(this.datos.idProveedor, this.datos.id, this.datos.lote, this.tipoAnticipoEdit, this.valor, this.imagen);
      this.modalCtrl.dismiss();
    }

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



