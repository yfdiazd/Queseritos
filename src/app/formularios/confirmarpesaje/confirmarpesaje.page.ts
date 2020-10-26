import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service'

@Component({
  selector: 'app-confirmarpesaje',
  templateUrl: './confirmarpesaje.page.html',
  styleUrls: ['./confirmarpesaje.page.scss'],
})
export class ConfirmarpesajePage implements OnInit {
  //variables para el metodo de confirmar el pesaje
  idPesajeCompra: string;
  idEstadoProducto: string;
  cantidadEstado = 0;
  costoKilo: number = 0;
  costoTotalEstado: number;
  calculaCostoTotal: number = 0;
  listaBultos: any[] = ["1"];
  total = 0;
  valor = 0;
  sumado = 0;

  pesoEdit;
  valorkgEdit;
  @Input() id;

  @Input() idCompra;
  @Input() idProv;
  constructor(
    private FB: FBservicesService,
    private popover: PopoverController
  ) { }

  ngOnInit() {

  }

  guardar() {
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    this.FB.agregarConfirmaPesaje(this.idProv, this.idCompra, this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);

    this.popover.dismiss(this.valorkgEdit, "valorkgEdit");
  }

  calcular(valor) {
    this.total = (valor * this.cantidadEstado);
    console.log("imprime valor", valor, this.total)
  }
  volver(){
    this.popover.dismiss();
  }

}