import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-saldar',
  templateUrl: './saldar.page.html',
  styleUrls: ['./saldar.page.scss'],
})
export class SaldarPage implements OnInit {

  constructor(private FB: FBservicesService,
    private modalCtrl: ModalController,
    private alertController: AlertController) { }

  @Input() idProv;
  @Input() creditoGeneral;
  @Input() debitoGeneral;
  @Input() saldoGeneral;

  deuda: boolean = false;
  deuda2: boolean = false;
  cobro: boolean = false;
  cobro2: boolean = false;
  conclusion: boolean = false;
  conclusion2: boolean = false;
  activarBoton: boolean = false;
  input_saldo: boolean = false;
  tanto;
  tanto2;
  sumado;

  valor;


  ngOnInit() {
    this.validarSaldoGeneral();
    this.validarEstadoSaldoProveedor();
    this.validarConclusion();

    this.FB.getEstadoProveedor(this.idProv);
  }

  validarSaldoGeneral() {
    if (this.saldoGeneral < 0) {
      this.deuda = true;
      this.tanto = (this.saldoGeneral * -1);
    } else if (this.saldoGeneral >= 0) {
      this.cobro = true;
      this.tanto = this.saldoGeneral;
    }
  }
  validarEstadoSaldoProveedor() {
    if (this.FB.estadoSaldoProveedor < 0) {
      this.deuda2 = true;
      this.tanto2 = (this.FB.estadoSaldoProveedor * -1);
    } else if (this.FB.estadoSaldoProveedor > 0) {
      this.cobro2 = true;
      this.tanto2 = this.FB.estadoSaldoProveedor;
    }
  }
  validarConclusion() {
    let sumado = this.saldoGeneral + this.FB.estadoSaldoProveedor;
    if (sumado < 0 && this.FB.estadoSaldoProveedor !== 0) {
      this.conclusion = true;
      this.sumado = (sumado * -1);
    } else if (sumado > 0 && this.FB.estadoSaldoProveedor !== 0) {
      this.conclusion2 = true;
      this.sumado = sumado;
    } else if (sumado == 0) {
      this.input_saldo = true;
      this.valor = 0;
      this.activarBoton = true;
    }
  }
  valorMensaje;
  guardar() {
    let valorEnviar;
    let sumado = this.saldoGeneral + this.FB.estadoSaldoProveedor;
    if (sumado < 0) {
      valorEnviar = (sumado + this.valor);
      console.log("se sumaaaaa es igual ? ", valorEnviar);

    } else {
      valorEnviar = (sumado - this.valor);
      console.log("se resta es ifual = ", valorEnviar);
      if (valorEnviar < 0) {
        valorEnviar = (valorEnviar * -1);
      }

    }
    console.log("esto se envia al metodo para saldar ", valorEnviar);

    // this.FB.saldarDeudasProveedor(this.idProv, valorEnviar);
    this.valorMensaje = valorEnviar;
    this.alerta();
    // this.FB.alertaSaldarLote(this.idProv, valorEnviar);
  }
  async alerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: 'Esta seguro de saldar este lote?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.modalCtrl.dismiss(this.valorMensaje, "actualizar");
          }
        }
      ]
    });
    await alert.present();
  }

  permitirGuardar(event) {
    console.log("cambiando", this.valor, event);
    if (this.valor == undefined ||
      this.valor == null ||
      this.valor == "" || event == null) {
      this.activarBoton = false;
    } else {
      this.activarBoton = true;
    }

  }
  volver() {
    this.modalCtrl.dismiss();
  }

}
