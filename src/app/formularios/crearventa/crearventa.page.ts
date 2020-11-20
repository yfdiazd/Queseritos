import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FBservicesService } from '../../fbservices.service';



@Component({
  selector: 'app-crearventa',
  templateUrl: './crearventa.page.html',
  styleUrls: ['./crearventa.page.scss'],
})
export class CrearventaPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private FB: FBservicesService
  ) {

  }
  productoDefault: any;
  //variables del form
  tipoQueso;
  estadoQueso;
  valor: number;
  activarBoton: boolean = false;

  ngOnInit() {
    this.traerTipoQuesoDefault();
    this.FB.getProductos();
    this.FB.getEstadoProducto();
  }
  volver() {
    this.modalCtrl.dismiss();
  }

  permitirGuardar(event) {
    console.log("cambiando", this.valor, event);
    if (this.tipoQueso == undefined
      || this.estadoQueso == undefined
      || this.tipoQueso == null
      || this.estadoQueso == null
      || this.tipoQueso == ""
      || this.estadoQueso == ""
      || event == undefined
      || event == null
      || event == ""
      || this.valor <= 0
      || event <= 0) {
      this.activarBoton = false;
    } else if (this.valor > 0 || event > 0) {
      this.activarBoton = true;
      console.log("enviara el valor", this.valor);
    } else {
      this.activarBoton = false;
    }
  }
  traerTipoQuesoDefault() {
    if (this.tipoQueso == undefined) {
      this.FB.productosLista.forEach(element => {
        if (element.estado == 1 && element.predetermina == true) {
          this.productoDefault = null;
          this.productoDefault = element.descripcion;
        }
      })
    } else {
      this.productoDefault = this.tipoQueso;
    }
  }

  listaPesadas: any[];
  objPesadas: any;
  guardar() {
    this.listaPesadas = [];
    this.objPesadas = null;
    this.objPesadas = ({
      tipoQueso: this.productoDefault,
      estadoQueso: this.estadoQueso,
      peso: this.valor
    });
    this.listaPesadas.push(this.objPesadas);
    this.modalCtrl.dismiss(this.listaPesadas, "lista");
    console.log("La lista es ", this.listaPesadas);
  }

}
