import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
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

  pesoEdit;
  valorkgEdit;
  @Input() id;

  @Input() idCompra;
  @Input() idProv;
  @Input() pesoDisponible;

  idEstadoProducto: string;
  peso = "";
  costoKilo = "";

  constructor(

    private FB: FBservicesService,
    private HP: HomepesajesPage,
    private popover: PopoverController
  ) { }

  ngOnInit() {
  }


  guardar() {
    this.costoTotalEstado = (parseInt(this.peso) * parseInt(this.costoKilo));
    this.FB.agregarConfirmaPesaje(this.idProv, this.idCompra, this.idEstadoProducto, this.peso, this.costoKilo, this.costoTotalEstado);
    this.FB.updateCostoCompra(this.idProv, this.idCompra, this.costoTotalEstado);
    this.popover.dismiss();
    this.FB.getPesajeConfirmado(this.idProv, this.idCompra);
  }

  calcular(valor) {
    this.sumado = (parseInt(this.peso) * parseInt(this.costoKilo));
    console.log("imprime valor", valor, this.sumado)
  }

  volver() {
    this.popover.dismiss();
  }







}