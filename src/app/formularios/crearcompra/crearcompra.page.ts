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

  public mostrar: boolean = false;
  productoDefault: any;
  //Variables para los bultos
  public numbulto = 1;
  public nuevoRegistro: any[] = [];
  public listaBultos: any[] = [];
  public bultoObj: any = null;
  public contadorPeso: number;
  public lote;
  //Nombre el proveedor
  public nombreProv: any;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private navCtrl: NavController
  ) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idProveedor = id;
    this.fecha = this.FB.fechaActual();
    this.traerTipoQuesoDefault();
    this.traerNombre();
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

  async traerNombre() {
    this.nombreProv = [];
    this.FB.proveedoresLista.forEach(element => {
      if (element.id == this.idProveedor) {
        this.nombreProv = element.nombre;
      }
    })
  }

  removeRegister(index) {
    this.listaBultos.splice(index, 1);
    this.validacion();
  }
  validacion(){
    if(this.listaBultos.length > 0){
      this.mostrar = true;
    }else{
      this.mostrar = false;
    }
  }

  async agregarBultoLista() {
    
    const alert = await this.alertController.create({
      cssClass: 'alertAddPeso',
      header: 'Creando bulto ' + (this.listaBultos.length + 1) + '.',
      keyboardClose: false,
      inputs: [
        {
          cssClass: 'inputAddPeso',
          name: 'peso',
          type: 'number',
          value: "",
          min: "1",
          placeholder: 'Ingrese el peso.',
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
            this.validacion();
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
    this.navCtrl.navigateForward(["cardcompradetallada/", this.idProveedor]);
  }
}
