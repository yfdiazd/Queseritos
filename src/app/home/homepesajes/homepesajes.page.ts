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

  pesoTotal = 0;

  isEnabled = true;

  ngOnInit() {
    localStorage.setItem("idCompraLocal", this.idCompra);
    localStorage.setItem("idProveedorLocal", this.idProv);
    this.idCompraLocal = this.idCompra;
    this.idProveedorLocal = this.idProv;
    this.traerPeso();
    this.sumarPesos();

  }
  async traerPeso() {
    this.FB.infoCompraUnica.forEach(info => {
      this.pesoTotal = info.pesoBultos;
    })
  }
  sumaPeso = 0;
  async sumarPesos() {
    this.sumaPeso = 0;
    this.FB.pesajeConfirmadoLista.forEach(info => {
      console.log("info.pesosDel Pesaje", info.cantidadEstado)
      this.sumaPeso = this.sumaPeso + parseInt(info.cantidadEstado);
      console.log("la suma es", this.sumaPeso)
    })
    if(this.sumaPeso == this.pesoTotal){
      this.isEnabled = false;
    }
  }


  crearModal() {
    var idCompra = localStorage.getItem("idCompraLocal");
    var idProv = localStorage.getItem("idProveedorLocal");
    // this.navCtrl.navigateForward('confirmarpesaje');
    this.presentPopover(idCompra, idProv);
  }

  async presentPopover(idCompra, idProv) {
    const popover = await this.PopoverController.create({
      component: ConfirmarpesajePage,
      cssClass: 'popover_style',
      translucent: true,
      componentProps: {
        idCompra: idCompra,
        idProv: idProv,
        pesoDisponible: (this.pesoTotal - this.sumaPeso) 
      },
    });
    await popover.present();
  };

  guardar() {

  }

  volver() {
    this.modalController.dismiss();
  }
}

