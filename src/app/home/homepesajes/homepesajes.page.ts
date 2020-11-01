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


  pesoTotal = 0;
  sumaPeso = 0;

  mostrarCrearConfirmar: boolean = true;

  ngOnInit() {
    this.traerPeso();
    this.sumarPesos()
    this.cambiarEstilos();
  }
  async traerPeso() {
    this.pesoTotal = 0;
    let valorPeso = await this.FB.infoCompraUnica;
    valorPeso.forEach(info => {
      this.pesoTotal = info.pesoBultos;
      console.log("ESto es el valorPeso", info.pesoBultos)
    })
  }
  async sumarPesos() {
    this.sumaPeso = 0;
    let valorPeso = await this.FB.pesajeConfirmadoLista;
    valorPeso.forEach(info => {
      console.log("info.pesosDel Pesaje", info.cantidadEstado)
      this.sumaPeso = this.sumaPeso + parseInt(info.cantidadEstado);
      console.log("la suma es", this.sumaPeso)
    });
    this.cambiarEstilos();
  }
  cambiarEstilos() {
    console.log("Esto es el peso actual", this.sumaPeso)
    if (this.sumaPeso < this.pesoTotal) {
      this.mostrarCrearConfirmar = true;
      document.getElementById("variablePeso").style.color = "green";
    } else if (this.sumaPeso >= this.pesoTotal) {
      this.mostrarCrearConfirmar = false;
      document.getElementById("variablePeso").style.color = "red";
    }
  }
  async presentPopover() {
    const popover = await this.PopoverController.create({
      component: ConfirmarpesajePage,
      cssClass: 'popover_style',
      translucent: true,
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
        idCompra: this.idCompra,
        idProv: this.idProv,
        pesoDisponible: (this.pesoTotal - this.sumaPeso)
      },
    });
    await popover.present();
    this.traerPeso();
    this.sumarPesos()
    this.cambiarEstilos();
  }
  guardar() {

  }
  volver() {
    this.modalController.dismiss();
  }
}

