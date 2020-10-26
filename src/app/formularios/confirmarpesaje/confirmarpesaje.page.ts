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

  @Input() pesoEdit;
  @Input() valorkgEdit;
  @Input() id;

  @Input() idCompra;
  @Input() idProv;
  constructor(
    private FB: FBservicesService,
    private popover: PopoverController
  ) { }

  ngOnInit() {
    this.FB.verificarsesion();
  }

  confirmar() {
    this.listaBultos.push("");
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    // this.FB.agregarConfirmaPesaje("1234", this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
    this.sumaCostoTotal();
  }
  

  guardar() {
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    this.FB.agregarConfirmaPesaje(this.idProv, this.idCompra, this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
    this.sumaCostoTotal();
    this.popover.dismiss();
  }



  calcular(valor) {
    this.total = (valor * this.cantidadEstado);
    console.log("imprime valor", valor, this.total)
  }

  eliminarBulto() {


  }

  editarBulto() {

  }
  // guardarPesajeConfirmado() {
  //   this.FB.getPesajeCompra();
  //   this.idPesajeCompra = "1602531822105";
  //   this.idEstadoProducto = "1602459210154";
  //   this.cantidadEstado = "50";
  //   this.costoKilo = "6500";
  //   this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
  //   console.log("Compramossss " + this.costoTotalEstado);
  //   this.sumaCostoTotal();

  //   //this.FB.agregarConfirmaPesaje(this.idPesajeCompra, this.idproveedor, this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
  // }
  sumaCostoTotal() {

    console.log("Ejecucion del metttt " + this.FB.pesajeCompraLista.length);
    this.FB.pesajeCompraLista.forEach(element => {
      if (element.id == "1603329959288") {
        console.log("Vallllll " + element.costoTotalCompra);
        this.calculaCostoTotal = (element.costoTotalCompra + this.costoTotalEstado);
        console.log("Sumaaaaaa " + this.calculaCostoTotal);

        //updateeeeee
         //this.FB.updatePesajeCompraValor("1602474514528", "1603329959288", this.calculaCostoTotal);
      }

    });
  }


}