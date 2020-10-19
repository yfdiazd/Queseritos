import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Console } from 'console';


import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: "app-crearpesajecompra",
  templateUrl: "./crearpesajecompra.page.html",
  styleUrls: ["./crearpesajecompra.page.scss"],
})
export class CrearpesajecompraPage implements OnInit {

  public id;
  //Variables para los bultos
  public numbulto = 1;
  public nuevoRegistro: any[] = [];
  public listaBultos: any[] = [];
  public bultoObj: any = null;
  public contadorPeso: number;
  public tipoQueso;
  public lote;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private FB: FBservicesService
  ) {
    // this.nombres = this.FB.proveedoresLista;
    // console.log("proveedor", this.nombres);
    // this.nombres.forEach(element => {
    //   if(element.id == this.id){
    //     console.log("Si lo encontro", element.nombre)
    //   }
    //   console.log("No se encontró")
    // });

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    console.log(" se recibe id: ", this.id);
  }

  removeRegister(index) {
    this.listaBultos.splice(index, 1);
  }

  agregarBultoLista() {
    this.presentAlertRadio();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Crear bulto ' + (this.listaBultos.length + 1),
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
              this.bultoObj = {
                peso: value.peso,
              };
              console.log("Bulto: " + this.bultoObj.bulto);
              console.log("Peso: " + this.bultoObj.peso);
              this.listaBultos.push(this.bultoObj);
              console.log("lista: ", this.listaBultos);
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
    this.listaBultos.splice(index);
    this.numbulto--;
  }

  edit(index) {
    this.listaBultos.forEach(element => {
      if (element.index == index) {
        console.log("Si lo encontro", element.peso)
      }
    })
  }

  contarPeso() {
    this.contadorPeso = 0;
    this.listaBultos.forEach((element) => {
      console.log("Peso de i: " + element.peso);
      this.contadorPeso = this.contadorPeso + parseInt(element.peso);
    });
    console.log("Total peso de los bultos: " + this.contadorPeso);
  }

  guardar() {
    // this.listaBultos.pop();
    this.contarPeso();
    console.log("El id del tipo de queso es: ", this.tipoQueso)
    console.log("Bultos enviados " + this.listaBultos.length);
    console.log("Peso que enviamos es de " + this.contadorPeso);
    console.log("Se envia el id del proveedor: ", this.id)
    this.FB.agregarPesaje(
      this.id,
      this.tipoQueso,
      this.listaBultos.length,
      this.contadorPeso,
      this.listaBultos
    );
    this.listaBultos = [];
  }
}
