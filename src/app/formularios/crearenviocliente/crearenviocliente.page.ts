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
  public fecha = "2020-10-01";
  codigociudadEdit: any;
  idconductor: any;
  pesoLimite;
  placaEdit;
  num;
  


  //variables alejo

  pesoAcumulado = 0;

  input_limite: boolean = false;

  customPickerOptions: any;

  nombreArchLoaded = "Subir archivo";


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
  public idcliente: any;
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    console.log("se recibe id solito", id);
    this.idcliente = id;
    console.log("se recibe id listacliente", this.idcliente);


  }
  volver() {
    this.navCtrl.navigateBack(['cardventas/', this.idcliente])
  }

  bloquearInputLimite(event) {
    if (event.detail.checked == true) {
      this.input_limite = true;
    } else if (event.detail.checked == false) {
      this.input_limite = false;
    }
  }
  agregarPesoLista() {
    this.presentAlertRadio();
  }
  async presentAlertRadio() {
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
    console.log("index", index);
    this.pesadas.splice(index);
    this.num--;
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
    this.FB.agregarVenta(this.idcliente, this.codigociudadEdit, this.idconductor, this.fecha, this.pesadas, this.contadorPeso, this.pesoLimite, this.placaEdit.toUpperCase());
    this.navCtrl.navigateBack(['cardventas/', this.idcliente]);
  }
  customAlertOptions: any = {
    header: "Seleccione",
    translucent: true,
    keyboardClose: false,
    backdropDismiss: false
  };

  pesadas: any[] = [];
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
          tipoQueso: element.tipoQueso
        });
        this.contarPeso();
      });
      console.log("esta es la lista para el front:", this.pesadas);
    }
  }



}


