import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { storage } from 'firebase';
import { FBservicesService } from 'src/app/fbservices.service';
import { ConfirmarpesajePage } from 'src/app/formularios/confirmarpesaje/confirmarpesaje.page';


@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-homepesajes',
  templateUrl: './homepesajes.page.html',
  styleUrls: ['./homepesajes.page.scss'],
})
export class HomepesajesPage implements OnInit {
  @Input() idCompra;
  @Input() idProv;
  @Input() lote;
  constructor(
    private FB: FBservicesService,
    public PopoverController: PopoverController,
    public modalController: ModalController,
    private alertController: AlertController

  ) {
    this.traerPeso();
    this.sumarPesos();
  }




  pesoTotal = 0;
  sumaPeso = 0;

  pesaje: any;

  mostrarCrearConfirmar: boolean = true;

  ngOnInit() {
    this.traerPeso();
    this.sumarPesos();
  }

  async traerPeso() {
    try {
      this.pesoTotal = 0;
      let valorPeso = await this.FB.infoCompraUnica;
      valorPeso.forEach(info => {
        this.pesoTotal = info.pesoBultos;
      })
    } catch (error) {

    }

  }

  async sumarPesos() {
    this.sumaPeso = 0;
    // let valorPeso = await this.FB.pesajeConfirmadoLista;
    this.FB.pesajeConfirmadoLista.forEach(info => {
      this.sumaPeso = this.sumaPeso + parseInt(info.cantidadEstado);
    });
  }

  async presentPopover() {
    console.log("Esto recibe:", this.idCompra, this.idProv, this.lote);
    const popover = await this.PopoverController.create({
      component: ConfirmarpesajePage,
      cssClass: 'popover_style',
      translucent: true,
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idCompra: this.idCompra,
        idProv: this.idProv,
        pesoTotal: this.pesoTotal,
        lote: this.lote
      },
    });
    await popover.present();
    this.sumarPesos();
    this.traerPeso();
  }
  volver() {
    this.modalController.dismiss("true", "actualizar");
  }
  async removeRegister(lista) {
    console.log("valores", this.idProv, this.idCompra, lista);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      message: 'Esta seguro de <strong>eliminar</strong> el pesaje confirmado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SI',
          handler: () => {
            console.log('Confirm Okay', lista);
            this.FB.deletePesajeConfirmado(this.idProv, this.idCompra, lista.id, lista.costoTotalEstado, this.lote);
            this.FB.getInfoCompra(this.idProv, this.idCompra, this.lote)
            this.FB.getPesajeConfirmado(this.idProv, this.idCompra, this.lote);
          }
        }
      ]
    });
    await alert.present();
  }
}
