import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-crearcompra',
  templateUrl: './crearcompra.page.html',
  styleUrls: ['./crearcompra.page.scss'],
})
export class CrearcompraPage implements OnInit {

  public idProveedor;
  public fecha;
  productoDefault: any;
  //Variables para los bultos
  public numbulto = 1;
  public nuevoRegistro: any[] = [];
  public listaBultos: any[] = [];
  public bultoObj: any = null;
  public contadorPeso: number;
  public lote;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private navCtrl: NavController
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
    this.idProveedor = id;
    this.fecha = this.FB.fechaActual();
    this.traerTipoQuesoDefault();
    // console.log(" se recibe id: ", this.id);
  }

  traerTipoQuesoDefault() {
    this.FB.productosLista.forEach(element => {
      if (element.estado == 1 && element.predetermina == true) {
        this.productoDefault = null;
        this.productoDefault = element.id;
      }
      console.log("No hay predeterminado");
    })
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
          value: ""
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
    console.log("El id del tipo de queso es: ", this.productoDefault)
    console.log("Bultos enviados " + this.listaBultos.length);
    console.log("Peso que enviamos es de " + this.contadorPeso);
    console.log("Se envia el id del proveedor: ", this.idProveedor)
    this.FB.agregarPesaje(
      this.idProveedor,
      this.productoDefault,
      this.listaBultos.length,
      this.contadorPeso,
      this.listaBultos
    );
    this.listaBultos = [];
    this.FB.getPesajeCompra(this.idProveedor);
    this.navCtrl.navigateForward(["cardcompradetallada/",this.idProveedor]);
  }
}
