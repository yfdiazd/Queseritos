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

  //variables para operaciones
  sumado = 0;


  @Input() id;

  @Input() idCompra;
  @Input() idProv;
  @Input() pesoTotal = 0;

  idEstadoProducto: string;
  peso = "";
  costoKilo = "";


  noPuede: boolean = false;
  siPuede: boolean = true;

  suma = 0;

  constructor(

    private FB: FBservicesService,
    private HP: HomepesajesPage,
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
    if (this.suma >= this.pesoTotal) {
      this.noPuede = true;
      this.siPuede = false;
    } else {
      this.noPuede = false;
      this.siPuede = true;
    }
  }


  guardar() {
    if (parseInt(this.peso) > (this.pesoTotal - this.suma)) {
      this.presentAlert();
    } else if (parseInt(this.peso) < 0 || (parseInt(this.costoKilo) < 0)) {
      this.presentAlert2();
    }
    else {
      this.costoTotalEstado = (parseInt(this.peso) * parseInt(this.costoKilo));
      this.FB.agregarConfirmaPesaje(this.idProv, this.idCompra, this.idEstadoProducto, this.peso, this.costoKilo, this.costoTotalEstado);
      this.FB.updateCostoCompra(this.idProv, this.idCompra, this.costoTotalEstado);
      this.FB.getPesajeConfirmado(this.idProv, this.idCompra);
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
}