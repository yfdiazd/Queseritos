import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { storage } from 'firebase';
import { FBservicesService } from 'src/app/fbservices.service';
import { ConfirmarventaPage } from 'src/app/formularios/confirmarventa/confirmarventa.page';

@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-homeventas',
  templateUrl: './homeventas.page.html',
  styleUrls: ['./homeventas.page.scss'],
})
export class HomeventasPage implements OnInit {
  fbsumapeso="$2.000";
  pesoTotal="200";
  fbsaldoPesoConfirmado="3000.000";
  constructor(
    private FB: FBservicesService,
    public PopoverController: PopoverController,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  @Input() idVenta;
  @Input() idClient;
  @Input() lote;
  sumaPeso = 0;
  //pesoTotal=0;
  pesaje: any;

  mostrarCrearConfirmar: boolean = true;
  ngOnInit() {
    this.traerPeso();
    this.sumarPesos();
  }
  async traerPeso() {
    //this.pesoTotal = 0;
    let valorPeso = await this.FB.infoCompraUnica;
    valorPeso.forEach(info => {
      this.pesoTotal = info.pesoPesada;
    })
  }
  async sumarPesos() {
    this.sumaPeso = 0;
    // let valorPeso = await this.FB.pesajeConfirmadoLista;
    this.FB.pesajeConfirmadoLista.forEach(info => {
      this.sumaPeso = this.sumaPeso + parseInt(info.cantidadEstado);
    });
  }

  async presentPopover() {
    const popover = await this.PopoverController.create({
      component: ConfirmarventaPage,
      cssClass: 'popover_style',
      translucent: true,
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idCompra: this.idVenta,
        idProv: this.idClient,
        pesoTotal: this.pesoTotal
      },
    });
    await popover.present();
    this.sumarPesos();
    this.traerPeso();
  }  
  volver() {
    this.modalController.dismiss();
  }
  async removeRegister(lista) {
    console.log("valores", this.idClient, this.idVenta, lista);

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
            this.FB.deletePesajeConfirmado(this.idClient, this.idVenta, lista.id, lista.costoTotalEstado, this.lote);
            this.FB.getInfoCompra(this.idClient, this.idVenta, this.lote)
            this.FB.getPesajeConfirmado(this.idClient, this.idVenta, this.lote);
          }
        }
      ]
    });
    await alert.present();
  }

}
