import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-agregarvalorventa',
  templateUrl: './agregarvalorventa.page.html',
  styleUrls: ['./agregarvalorventa.page.scss'],
})
export class AgregarvalorventaPage implements OnInit {
  valor: number;
  constructor(private FB: FBservicesService,
    private alertController: AlertController,
    private popover: PopoverController) { }

  ngOnInit() {
  }
  guardar() {
    if (this.valor <= 0 || this.valor == undefined) {
      this.notificacionValorInvalido();
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
