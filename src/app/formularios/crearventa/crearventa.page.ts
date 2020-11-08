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

  //variables del form
  tipoQueso;
  estadoQueso;
  valor;
  activarBoton: boolean = false;

  ngOnInit() {
    this.FB.getProductos();
    this.FB.getEstadoProducto();
  }
  volver() {
    this.modalCtrl.dismiss();
  }

  permitirGuardar(event) {
    console.log("cambiando", this.valor, event);
    if (this.tipoQueso == undefined || this.estadoQueso == undefined || this.valor == undefined ||
      this.tipoQueso == null || this.estadoQueso == null || this.valor == null ||
      this.tipoQueso == "" || this.estadoQueso == "" || this.valor == "" || event == null) {
      this.activarBoton = false;
    } else {
      this.activarBoton = true;
    }
  }


  listaPesadas: any[];
  objPesadas: any;
  guardar() {
    this.listaPesadas = [];
    this.objPesadas = null;
    this.objPesadas = ({
      tipoQueso: this.tipoQueso,
      estadoQueso: this.estadoQueso,
      peso: this.valor
    });
    this.listaPesadas.push(this.objPesadas);
    this.modalCtrl.dismiss(this.listaPesadas, "lista");
    console.log("La lista es ", this.listaPesadas);




  }

}
