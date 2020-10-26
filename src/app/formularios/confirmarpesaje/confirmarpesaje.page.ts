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
  idEstadoProducto: string;
  cantidadEstado = 0;
  costoKilo: number = 0;
  costoTotalEstado: number;
  calculaCostoTotal: number = 0;
  listaBultos: any[] = ["1"];
  total = 0;
  valor = 0;
  sumado = 0;
  objCompreDetallada: any = [];

  @Input() pesoEdit;
  @Input() valorkgEdit;
  @Input() id;

  @Input() idCompra;
  @Input() idProv;
  constructor(
    
    private FB: FBservicesService,
    private HP: HomepesajesPage,
    private popover: PopoverController
  ) { }

  ngOnInit() {
  }


  guardar() {


    this.objCompreDetallada = null;
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));

    this.objCompreDetallada = ({
      idProv: this.idProv,
      idCompra: this.idCompra,
      idEstProd: this.idEstadoProducto,
      peso: this.cantidadEstado,
      costKilo: this.costoKilo,
      costTotal: this.costoTotalEstado

    });


    console.log("lista tiene  ", this.objCompreDetallada);
    this.popover.dismiss(this.objCompreDetallada, "pesajeConfirmado");
  }

  calcular(valor) {
    this.total = (valor * this.cantidadEstado);
    console.log("imprime valor", valor, this.total)
  }


}