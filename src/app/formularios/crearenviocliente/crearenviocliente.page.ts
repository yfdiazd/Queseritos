import { Component, Input, NgModule, OnInit } from "@angular/core";
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FBservicesService } from "../../fbservices.service";
import { CrearventaPage } from '../crearventa/crearventa.page';

@Component({
  selector: 'app-crearenviocliente',
  templateUrl: './crearenviocliente.page.html',
  styleUrls: ['./crearenviocliente.page.scss'],
})
export class CrearenvioclientePage implements OnInit {
  public numpesada = 1;
  public nuevoRegistro: any[] = [];
  public listaPesada: any[] = [];
  public pesadaObj: any = null;
  public contadorPeso: number;
  public tipoQueso;
  public lote;
  // public fecha = "2020-10-01";
  // codigociudadEdit: any;
  // conductor: any;
  // pesoLimite;
  // placaEdit;
  num;

  @Input() editar;
  @Input() data;
  @Input() pesoLimite;
  @Input() pesoAcumulado;
  @Input() codigociudadEdit;
  @Input() fecha;
  @Input() conductor;
  @Input() ciudad;
  @Input() idCliente;
  @Input() placa;
  @Input() pesadas;




  //variables alejo

  // pesoAcumulado = 0;
  input_limite: boolean = false;
  customPickerOptions: any;
  nombreArchLoaded = "Subir archivo";
  bultoObj: any;
  toggle: boolean = false;

  // pesadas: any[] = [];


  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Aceptar',
        handler: (fecha) => {
          this.fecha = fecha.year.text + "-" + fecha.month.text + "-" + fecha.day.text;
          console.log("fecha", fecha, this.fecha);
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }
  }
  ngOnInit() {
    this.agregarPesoLimite();
    this.validacion();
    this.contarPeso();
  }
  volver() {
    this.modalCtrl.dismiss();
  }

  async agregarPesoLimite() {
    const alert = await this.alertController.create({
      cssClass: 'alertAddPeso',
      header: 'Ingrese el peso límite.',
      keyboardClose: false,
      backdropDismiss: false,
      inputs: [
        {
          cssClass: 'inputAddPeso',
          name: 'peso',
          type: 'number',
          value: "",
          min: "1"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (value) => {
            console.log("vlue", value.peso);
            if (value.peso == "" || value.peso == null || value.peso < 0 || value.peso == 0 || value.peso == undefined) {
              this.limiteSinIngresar();
              this.toggle = false;
              this.input_limite = false;
            }
            else {
              this.toggle = true;
              this.input_limite = true;
              this.pesoLimite = value.peso;
            }
          }
        }
      ]
    });
    await alert.present();
  }
  async limiteSinIngresar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No ingresaste un peso límite',
      message: 'Por favor agregalo mas tarde',
      buttons: ['ACEPTAR']
    });

    await alert.present();
  }
  bloquearInputLimite(event) {
    if (event.detail.checked == true) {
      this.input_limite = true;
    } else if (event.detail.checked == false) {
      this.input_limite = false;
    }
  }
  async agregarPesoLista() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      header: 'Crear Pesada ' + (this.listaPesada.length + 1),
      inputs: [
        {
          name: 'peso',
          type: 'tel',
          value: 0
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            if (value != 0) {
              console.log("El campo peso si se modificó")
              this.pesadaObj = {
                peso: value.peso,
              };
              console.log("Bulto: " + this.pesadaObj.bulto);
              console.log("Peso: " + this.pesadaObj.peso);
              this.listaPesada.push(this.pesadaObj);
              console.log("lista: ", this.listaPesada);
              console.log('Confirm Ok', value);
            } else {
              console.log("El peso no fue modificado");
            }
          }
        }
      ]
    });

    await alert.present();
  }
  eliminarBulto(index) {
    this.pesadas.splice(index, 1);
    this.sumarPesoAcumulado();
    this.validarPesos();
  }
  contarPeso() {
    this.contadorPeso = 0;
    this.pesadas.forEach((element) => {
      console.log("Peso de i: " + element.peso);
      this.contadorPeso = this.contadorPeso + parseInt(element.peso);
    });
    console.log("Total peso de los bultos: " + this.contadorPeso);
  }
  guardar() {
    if (this.editar == "true") {
      let pesadaGuardar: any[] = [];
      let i = 1;
      let sumaCostoVenta = 0;
      this.pesadas.forEach(element => {
        pesadaGuardar.push({
          estadoQueso: element.estadoQueso,
          peso: element.peso,
          tipoQueso: element.tipoQueso,
          valor: element.valor,
          valorTotal: element.valorTotal,
          id: i++
        })
        console.log("lista recorrida", pesadaGuardar);
        pesadaGuardar.forEach(sumar => {
          sumaCostoVenta += sumar.valorTotal;
        })
      });
      console.log("data de card", pesadaGuardar, " y ", sumaCostoVenta, "data", this.idCliente, this.ciudad, this.conductor, this.fecha, pesadaGuardar, this.contadorPeso, this.pesoLimite, this.placa.toUpperCase(), this.imagenVenta, sumaCostoVenta, this.data.id);
      this.FB.actualizarVenta(this.idCliente, this.ciudad, this.conductor, this.fecha, pesadaGuardar, this.contadorPeso, this.pesoLimite, this.placa.toUpperCase(), this.imagenVenta, sumaCostoVenta, this.data.id);
      this.modalCtrl.dismiss("true", "actualizar");
    } else {
      let pesadaGuardar: any[] = [];
      let i = 1;
      this.pesadas.forEach(element => {
        pesadaGuardar.push({
          estadoQueso: element.estadoQueso,
          peso: element.peso,
          tipoQueso: element.tipoQueso,
          valor: 0,
          valorTotal: 0,
          id: i++
        })
        console.log("lista recorrida", pesadaGuardar);
      });
      this.FB.agregarVenta(this.idCliente, this.ciudad, this.conductor, this.fecha, pesadaGuardar, this.contadorPeso, this.pesoLimite, this.placa.toUpperCase(), this.imagenVenta);
      this.modalCtrl.dismiss("true", "actualizar");
    }
  }

  customAlertOptions: any = {
    header: "Seleccione",
    translucent: true,
    keyboardClose: false,
    backdropDismiss: false
  };

  async agregar() {
    const modal = await this.modalCtrl.create({
      component: CrearventaPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      backdropDismiss: false,
      componentProps: {
      },
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data != undefined) {
      console.log("Entro al if: ", data);
      data.forEach(element => {
        this.pesadas.push({
          estadoQueso: element.estadoQueso,
          peso: element.peso,
          tipoQueso: element.tipoQueso,
          valor: 0,
          valorTotal: 0
        });
        this.contarPeso();
      });
      console.log("esta es la lista para el front:", this.pesadas);
      this.sumarPesoAcumulado();
      this.validacion();
      this.validarPesos();
    }

  }
  sumarPesoAcumulado() {
    this.pesoAcumulado = 0;
    this.pesadas.forEach(pesada => {
      this.pesoAcumulado += pesada.peso;
    })
    return this.pesoAcumulado;
  }
  btn_guardar: boolean = false;
  validacion() {
    if (this.pesadas == undefined) {
      console.log("viene  a crear el compae");
      this.btn_guardar = false;
    } else if (this.pesadas.length > 0) {
      this.btn_guardar = true;
    }
  }
  validarPesos() {
    if (this.pesoAcumulado >= this.pesoLimite) {
      document.getElementById("pesoAcumulado").style.color = "red";
    } else {
      document.getElementById("pesoAcumulado").style.color = "lime";
    }
  }

  imagenVenta: any;
  subirImg(event) {
    this.imagenVenta = event;
    console.log("la imagen en la variable es ", this.imagenVenta);


  }

}


