import { Component, Input, NgModule, OnInit } from "@angular/core";
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FBservicesService } from "../../fbservices.service";

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

  //variables alejo
  pesoLimite;
  pesoAcumulado = 0;
  
  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
  
   }
 public idcliente:any;
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    console.log("se recibe id solito", id );
    this.idcliente=id;
    console.log("se recibe id listacliente", this.idcliente);
    
   
  }

  removeRegister(index) {
    this.listaPesada.splice(index, 1);
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
    this.listaPesada.splice(index);
    this.numpesada--;
  }

  edit(index) {
    this.listaPesada.forEach(element => {
      if (element.index == index) {
        console.log("Si lo encontro", element.peso)
      }
    })
  }

  contarPeso() {
    this.contadorPeso = 0;
    this.listaPesada.forEach((element) => {
      console.log("Peso de i: " + element.peso);
      this.contadorPeso = this.contadorPeso + parseInt(element.peso);
    });
    console.log("Total peso de los bultos: " + this.contadorPeso);
  }

  // guardar() {
  //   // this.listaBultos.pop();
  //   this.contarPeso();
  //   console.log("El id del tipo de queso es: ", this.tipoQueso)
  //   console.log("Bultos enviados " + this.listaBultos.length);
  //   console.log("Peso que enviamos es de " + this.contadorPeso);
  //   console.log("Se envia el id del proveedor: ", this.idProveedor)
  //   this.FB.agregarPesaje(
  //     this.idProveedor,
  //     this.tipoQueso,
  //     this.listaBultos.length,
  //     this.contadorPeso,
  //     this.listaBultos
  //   );
  //   this.listaBultos = [];
  // }

}
