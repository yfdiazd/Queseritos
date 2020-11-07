import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

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


  guardar() {

  }

}
