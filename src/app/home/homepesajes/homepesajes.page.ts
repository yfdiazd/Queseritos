import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
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
  public listaCompraDetallada: any[] = [];
  constructor(
    private FB: FBservicesService,
    public PopoverController: PopoverController,
    public modalController: ModalController,

  ) { }
  
  @Input() idCompra;
  @Input() idProv;

  idCompraLocal: any;
  idProveedorLocal: any;

  ngOnInit() {
    localStorage.setItem("idCompraLocal", this.idCompra);
    localStorage.setItem("idProveedorLocal", this.idProv);
    this.idCompraLocal = this.idCompra;
    this.idProveedorLocal = this.idProv;    
  }

  crearModal() {
    var idCompra = localStorage.getItem("idCompraLocal");
    var idProv = localStorage.getItem("idProveedorLocal");
    // this.navCtrl.navigateForward('confirmarpesaje');
    this.presentPopover(idCompra,idProv);
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
    if(data !== "" || data !== null || data !== undefined){
      this.listaCompraDetallada.push(data);
    }

  };

  guardar(){
    let sumaCosto = 0;
    let idProv: any;
    let idComp: any;
    this.listaCompraDetallada.forEach(element =>{
      sumaCosto += element.costTotal;
      console.log("COMPRAAAAA:" , element.idCompra," - ", this.idCompraLocal)
      this.FB.agregarConfirmaPesaje(element.idProv, element.idCompra, element.idEstProd, element.peso, element.costKilo, element.costTotal);
      idProv = element.idProv;
      idComp = element.idCompra;
    });

    this.FB.updateCostoCompra(idProv, idComp, sumaCosto);
  }
  
  volver(){
    this.modalController.dismiss();
  }
}

