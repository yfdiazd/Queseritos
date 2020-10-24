import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';
import { ConfirmarpesajePage } from 'src/app/formularios/confirmarpesaje/confirmarpesaje.page';

@Component({
  selector: 'app-homepesajes',
  templateUrl: './homepesajes.page.html',
  styleUrls: ['./homepesajes.page.scss'],
})
export class HomepesajesPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    public PopoverController: PopoverController,
    private navCtrl: NavController,
    public modalController: ModalController
  ) { }

  @Input() idCompra;
  @Input() idProv;
  @Input() listaBultos;
  saldo = 20000;

  ngOnInit() {
  }

  crearModal() {
    // this.navCtrl.navigateForward('confirmarpesaje');
    this.presentPopover(this.idCompra, this.idProv);
  }

  async presentPopover(idCompra,idProv) {
    const popover = await this.PopoverController.create({
      component: ConfirmarpesajePage,
      cssClass: 'popover_style',
      translucent: true,
      componentProps: {
        idCompra: idCompra,
        idProv: idProv
      },
    });
    console.log("Este es el id enviado:", idCompra, idProv)
    return await popover.present();
  }

}
