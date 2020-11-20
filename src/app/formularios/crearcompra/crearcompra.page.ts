import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-crearcompra',
  templateUrl: './crearcompra.page.html',
  styleUrls: ['./crearcompra.page.scss'],
})
export class CrearcompraPage implements OnInit {


  public fecha;

  public mostrar: boolean = false;
  productoDefault: any;
  //Variables para los bultos
  public numbulto = 1;
  public nuevoRegistro: any[] = [];
  public bultoObj: any = null;
  public contadorPeso: number;
  public lote;
  //Nombre el proveedor
  public nombreProv: any;

  @Input() idProveedor;
  //Estas variables se llenan cuando viene a editar
  @Input() idCompra;
  @Input() listaBultosEdit: any[] = [];
  @Input() productoEdit;
  lastLote = [];

  constructor(
    private alertController: AlertController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.fecha = this.FB.fechaActual();
    this.traerTipoQuesoDefault();
    this.traerNombre();
    this.validacion();
    this.lastLote = [];
    this.lastLote = (this.FB.listaOrdenLotes().slice(this.FB.listaOrdenLotes().length - 1));
    console.log("Se recibe id proveedor para editar: ", this.idProveedor);
    console.log("lista a mostrar", this.listaBultosEdit);
  }

  traerTipoQuesoDefault() {
    if (this.productoEdit == undefined) {
      this.FB.productosLista.forEach(element => {
        if (element.estado == 1 && element.predetermina == true) {
          this.productoDefault = null;
          this.productoDefault = element.id;
        }
      })
    } else {
      this.productoDefault = this.productoEdit;
    }
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
    this.listaBultosEdit.splice(index, 1);
    this.validacion();
  }

  validacion() {
    if (this.listaBultosEdit.length > 0) {
      this.mostrar = true;
    } else {
      this.mostrar = false;
    }
  }

  async agregarBultoLista() {

    const alert = await this.alertController.create({
      cssClass: 'alertAddPeso',
      header: 'Creando bulto ' + (this.listaBultosEdit.length + 1) + '.',
      keyboardClose: false,
      backdropDismiss: false,
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
              this.bultoObj = {
                peso: value.peso,
              };
              this.listaBultosEdit.push(this.bultoObj);

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

  edit(index) {
    this.listaBultosEdit.forEach(element => {
      if (element.index == index) {
        console.log("Si lo encontro", element.peso)
      }
    })
  }

  contarPeso() {
    this.contadorPeso = 0;
    this.listaBultosEdit.forEach((element) => {
      console.log("Peso de i: " + element.peso);
      this.contadorPeso = this.contadorPeso + parseInt(element.peso);
    });
    console.log("Total peso de los bultos: " + this.contadorPeso);
  }

  guardar() {

    if (this.idCompra == undefined) {

      this.contarPeso();
      this.FB.agregarPesaje(
        this.idProveedor,
        this.productoDefault,
        this.listaBultosEdit.length,
        this.contadorPeso,
        this.listaBultosEdit
      );
      this.listaBultosEdit = [];
      this.FB.getPesajeCompra(this.idProveedor, this.lastLote.toString());
      this.navCtrl.navigateBack(["cardcompradetallada/", this.idProveedor]);
      this.modalCtrl.dismiss("true", "actualizar");
      this.FB.getProveedorCompra();
      this.FB.getAnticipoProveedor();
    } else {
      this.contarPeso();
      this.FB.updateBultoPesajeDetallado(
        this.idProveedor,
        this.idCompra,
        this.listaBultosEdit,
        this.contadorPeso,
        this.listaBultosEdit.length,
        this.productoDefault
      );
      this.listaBultosEdit = [];
      this.FB.getPesajeCompra(this.idProveedor, this.lastLote.toString());
      this.navCtrl.navigateBack(["cardcompradetallada/", this.idProveedor]);
      this.modalCtrl.dismiss("true", "actualizar");
      this.FB.getProveedorCompra();
      this.FB.getAnticipoProveedor();

    }

  }
  volver() {
    this.modalCtrl.dismiss();
  }
}
