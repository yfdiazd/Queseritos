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
  sumaPeso = 0;

  mostrarCrearConfirmar: boolean = true;
  mostrarMsgLleno: boolean = false;

  ngOnInit() {
    localStorage.setItem("idCompraLocal", this.idCompra);
    localStorage.setItem("idProveedorLocal", this.idProv);
    this.idCompraLocal = this.idCompra;
    this.idProveedorLocal = this.idProv;
    this.traerPeso();
    this.cambiarEstilos();

  }

  async traerPeso() {
    let valorPeso = await this.FB.infoCompraUnica;
    valorPeso.forEach(info => {
      this.pesoTotal = info.pesoBultos;
      console.log("ESto es el valorPeso", info.pesoBultos)
    })
    this.sumarPesos();
  }

  async sumarPesos() {
    let valorPeso = await this.FB.pesajeConfirmadoLista;
    valorPeso.forEach(info => {
      console.log("info.pesosDel Pesaje", info.cantidadEstado)
      this.sumaPeso = this.sumaPeso + parseInt(info.cantidadEstado);
      console.log("la suma es", this.sumaPeso)
    });
    this.validarCrear();
    this.cambiarEstilos();

  }

  validarCrear() {
    if (this.sumaPeso >= this.pesoTotal) {
      this.mostrarCrearConfirmar = false;
    } else {
      this.mostrarCrearConfirmar = true;
    }
  }

  crearModal() {
    var idCompra = localStorage.getItem("idCompraLocal");
    var idProv = localStorage.getItem("idProveedorLocal");
    // this.navCtrl.navigateForward('confirmarpesaje');
    this.presentPopover(idCompra, idProv);
  }
  pesoActual;
  numero;
  

  cambiarEstilos() {
    console.log("Esto es el peso actual", this.sumaPeso)
    if (this.sumaPeso < this.pesoTotal) {
      console.log("Esto es el peso actual", this.sumaPeso)
      document.getElementById("variablePeso").style.color = "green";
    } else if (this.sumaPeso >= this.pesoTotal) {
      document.getElementById("variablePeso").style.color = "red";
      this.mostrarMsgLleno = true;
    }
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
    this.traerPeso();
  };

  guardar() {

  }

  volver() {
    this.modalController.dismiss();
  }
}

