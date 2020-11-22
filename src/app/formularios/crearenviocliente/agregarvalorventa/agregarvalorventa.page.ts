import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
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
  @Input() flag
  btn_guardar: boolean = false;
  public loading: any;
  constructor(private FB: FBservicesService,
    private alertController: AlertController,
    private popover: PopoverController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  guardar() {
    this.presentLoading('Estamos actualizando las coincidencias, por favor espere.');
    setTimeout(() => {
      this.loading.dismiss();
      if (this.valor <= 0 || this.valor == undefined) {
        this.notificacionValorInvalido();
      } else {
        this.FB.updatePesadas(this.dataVenta.idCliente, this.dataVenta.fechaEnvio, this.dataVenta.id, this.dataBulto.id, this.dataBulto.peso, this.valor);
        this.popover.dismiss("true", "actualizar");
      }
    }, 2000);
    this.btn_guardar = true;
    
  }
  async presentLoading(message: string) {    
    this.loading = await this.loadingCtrl.create({
      message,
      cssClass: 'cssLoading',
      keyboardClose: false,
      backdropDismiss: false,
      spinner: 'lines',
      translucent: true
    });
    return this.loading.present();
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
