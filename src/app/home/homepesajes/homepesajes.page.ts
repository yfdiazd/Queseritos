import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { element } from 'protractor';
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
    private navCtrl: NavController,
    public modalController: ModalController,

  ) {

  }

  @Input() idCompra;
  @Input() idProv;
  @Input() listaBultos;


  ngOnInit() {
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
    console.log("Esto trajo:", data);
    this.listaCompraDetallada.push(data);
    console.log("La lista es deeeeeeeeeeeeeeeeee ", this.listaCompraDetallada)
  };

  guardar(){
    let sumaCosto = 0;
    let idProv: any;
    let idComp: any;
    this.listaCompraDetallada.forEach(element =>{
      sumaCosto += element.costTotal;
      this.FB.agregarConfirmaPesaje(element.idProv, element.idCompra, element.idEstProd, element.peso, element.costKilo, element.costTotal);
      idProv = element.idProv;
      idComp = element.idCompra;
    });

    this.FB.updateCostoCompra(idProv, idComp, sumaCosto);

  }
}

