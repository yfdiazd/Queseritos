import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
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
  

  //variables dummy 
  proveedor = "fernanda";
  fechcompra = "05-10-2020";
  estadoqueso = "Borona";
  estadoqueso1 = "Normal";
  tipqueso = "Costeño";
  totalbultos = 30;
  pesototal = 1000;
  constructor(
    private FB: FBservicesService
  ) { }

  ngOnInit() {
    this.FB.verificarsesion();
  }

  confirmar(){
    this.listaBultos.push(""); 
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    this.FB.agregarConfirmaPesaje("1", "1234", this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
    this.sumaCostoTotal();
  }

  guardar(){
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    this.FB.agregarConfirmaPesaje("1", "1234", this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
    this.sumaCostoTotal();
  }

  calcular(valor){
    this.total = (valor * this.cantidadEstado);
    console.log("imprime valor", valor, this.total)
  }

  eliminarBulto(){


  }

  editarBulto(){

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
      if (element.id == "1602537527210") {
        console.log("Vallllll " + element.costoTotalCompra);
        this.calculaCostoTotal = (element.costoTotalCompra + this.costoTotalEstado);
        console.log("Sumaaaaaa " + this.calculaCostoTotal);

        //updateeeeee
        this.FB.updatePesajeCompra("1602537527210", this.calculaCostoTotal);
      }

    });
  }

}
