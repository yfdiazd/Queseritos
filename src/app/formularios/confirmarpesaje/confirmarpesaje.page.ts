import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service';
import { HomepesajesPage } from '../../home/homepesajes/homepesajes.page';


@Component({
  selector: 'app-confirmarpesaje',
  templateUrl: './confirmarpesaje.page.html',
  styleUrls: ['./confirmarpesaje.page.scss'],
})
export class ConfirmarpesajePage implements OnInit {
  //variables para el metodo de confirmar el pesaje
  idPesajeCompra: string;


  costoTotalEstado: number;
  //variable auto costo del peso y costo
  calculaCostoTotal: number = 0;

  @Input() id;
  @Input() idCompra;
  @Input() idProv;
  @Input() pesoTotal = 0;
  @Input() lote;

  idEstadoProducto: string;
  peso = "";
  costoKilo = "";


  noPuede: boolean = false;
  siPuede: boolean = true;

  suma;

  constructor(
    private FB: FBservicesService,
    private popover: PopoverController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.validarCreacion();
    console.log("Datos recibidos",
      this.idCompra,
      this.idProv,
      this.pesoTotal,
    );
  }

  validarCreacion() {

    this.suma = 0;
    // let valorPeso = await this.FB.pesajeConfirmadoLista;
    this.FB.pesajeConfirmadoLista.forEach(info => {
      this.suma += parseInt(info.cantidadEstado);
    });

    if ((this.pesoTotal - this.suma) == 0) {
      this.noPuede = true;
      this.siPuede = false;
    } else {
      this.noPuede = false;
      this.siPuede = true;
    }
  }
  calcular() {
    this.costoTotalEstado = (parseInt(this.peso) * parseInt(this.costoKilo));
  }

  guardar() {
    if (parseInt(this.peso) > (this.pesoTotal - this.suma)) {
      this.presentAlert();
    } else if (parseInt(this.peso) <= 0 || (parseInt(this.costoKilo) <= 0)) {
      this.presentAlert2();
    } else if (this.idEstadoProducto == undefined || this.idEstadoProducto == "") {
      this.presentAlert3()
    }
    else {
      this.FB.agregarConfirmaPesaje(this.idProv, this.idCompra, this.idEstadoProducto, this.peso, this.costoKilo, this.costoTotalEstado, this.lote);
      this.FB.updateCostoCompra(this.idProv, this.idCompra, this.costoTotalEstado, "suma", this.lote);
      this.FB.getPesajeConfirmado(this.idProv, this.idCompra, this.lote);
      this.popover.dismiss();
    }
  }

  volver() {
    this.popover.dismiss();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restricción',
      message: 'El peso que intenta registrar no puede superar el peso disponible ' + (this.pesoTotal - this.suma),
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restricción',
      message: 'El peso y/o valor registrado no puede ser negativo.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restricción',
      message: 'Seleccione un estado de queso para registrar',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}