import { Component, OnInit, Input } from '@angular/core';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service'
import { HomeventasPage } from '../../home/homeventas/homeventas.page';
@Component({
  selector: 'app-confirmarventa',
  templateUrl: './confirmarventa.page.html',
  styleUrls: ['./confirmarventa.page.scss'],
})
export class ConfirmarventaPage implements OnInit {
  idPesajeCompra: string;
  idEstadoProducto: string;
  cantidadEstado = 0;
  costoKilo: number = 0;
  costoTotalEstado: number;
  calculaCostoTotal: number = 0;
  listaPesadas: any[] = ["1"];
  total = 0;
  valor = 0; 
  constructor(
    private FB: FBservicesService,
    private popover: PopoverController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }
  confirmar(){
    this.listaPesadas.push(""); 
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    // this.FB.agregarConfirmaPesaje("1234", this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
    this.sumaCostoTotal();
  }
  guardar(){
    this.costoTotalEstado = ((this.cantidadEstado) * (this.costoKilo));
    // this.FB.agregarConfirmaPesaje( "1234", this.idEstadoProducto, this.cantidadEstado, this.costoKilo, this.costoTotalEstado);
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
 
  sumaCostoTotal() {
    
    console.log("Ejecucion del metttt " + this.FB.pesajeCompraLista.length);
    this.FB.pesajeCompraLista.forEach(element => {
      if (element.id == "1602537527210") {
        console.log("Vallllll " + element.costoTotalCompra);
        this.calculaCostoTotal = (element.costoTotalCompra + this.costoTotalEstado);
        console.log("Sumaaaaaa " + this.calculaCostoTotal);

        //updateeeeee
        // this.FB.updatePesajeCompra("1602537527210", this.calculaCostoTotal);
      }

    });
  }
  volver() {
    this.popover.dismiss();
  }
}
