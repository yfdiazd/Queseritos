import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
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
  public listaCompraDetallada: any[] = [];
  constructor(
    private FB: FBservicesService,
    public PopoverController: PopoverController,
    public modalController: ModalController,

  ) { }

  @Input() idCompra;
  @Input() idProv;

  ngOnInit() {
    console.log("Se reciben datos_: ", this.idCompra, this.idProv)
    console.log("Esto trae como info de la compra:", this.FB.infoCompraUnica);
  }

  crearModal() {
    // this.navCtrl.navigateForward('confirmarpesaje');
    this.presentPopover(this.idCompra, this.idProv);
  }

  async presentPopover(idCompra, idProv) {
    const popover = await this.PopoverController.create({
      component: ConfirmarpesajePage,
      cssClass: 'popover_style',
      translucent: true,
      componentProps: {
        idCompra: idCompra,
        idProv: idProv
      },
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    this.listaCompraDetallada.push(data);
  };

  volver() {
    this.modalController.dismiss();
  }
}

