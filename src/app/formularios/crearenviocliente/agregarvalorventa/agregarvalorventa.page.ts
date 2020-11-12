import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-agregarvalorventa',
  templateUrl: './agregarvalorventa.page.html',
  styleUrls: ['./agregarvalorventa.page.scss'],
})
export class AgregarvalorventaPage implements OnInit {
  valor: number;
  @Input() dataBulto;
  @Input() dataVenta;

  constructor(private FB: FBservicesService,
    private alertController: AlertController,
    private popover: PopoverController) { }

  ngOnInit() {
  }
  guardar() {
    if (this.valor <= 0 || this.valor == undefined) {
      this.notificacionValorInvalido();
    } else {
      // console.log("Se updateará esto:", this.dataVenta.idCliente, this.dataVenta.fechaEnvio, this.dataVenta.id, this.dataBulto.id, this.dataBulto.peso, this.valor);
      this.FB.updatePesadas(this.dataVenta.idCliente, this.dataVenta.fechaEnvio, this.dataVenta.id, this.dataBulto.id, this.dataBulto.peso, this.valor);
      this.FB.updatecostoVenta(this.dataVenta.idCliente, this.dataVenta.fechaEnvio, this.dataVenta.id, this.dataBulto.peso, this.valor, this.dataVenta.costoVenta);
      this.popover.dismiss("true", "actualizar");
    }
  }

  volver() {
    this.popover.dismiss();
  }
  async notificacionValorInvalido() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restricción',
      message: 'No puedes guardar un valor menor o igual a 0.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
