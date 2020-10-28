import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';


@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {

  public listaProveedores: any[];
  public input = { data: [] };
  public idProv;

  //Variable donde se guarda el lote actual en el que se esta comprando
  loteActual: any;
  //Lista de nombres a mostrar
  public listaDatos: any = [];
  public objProv: any;


  constructor(
    public actionSheetController: ActionSheetController,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController

  ) { }

  ngOnInit() {
    this.validacionLote();
    this.FB.getLoteProveedor();
    this.traerNombre();
  }

  doRefresh(event) {
    this.FB.getLoteProveedor();
    this.validacionLote();
    this.traerNombre();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  traerNombre() {
    this.listaDatos = [];
    this.objProv = null;
    this.FB.proveedoresLista.forEach(element => {
      this.FB.listaPaVer.forEach(element2 => {
        if (element.id == element2.idProvedor) {
          this.objProv = ({
            nombre: element.nombre,
            idProv: element.id,
            bultos: element2.bultos,
            costo: element2.costo,
            peso: element2.peso,
            debito: element2.debito
          });
          this.listaDatos.push(this.objProv);
        }
      })
    })
    return this.listaDatos;
  }

  //Validación del ultimo lote con el día en que ingresa a cardcompras: Muestra el alert
  validacionLote() {
    this.loteActual = (this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1));
    if (this.loteActual.toString().includes(this.FB.fechaActual())) {
    } else {
      this.alertConfirmarNuevoLote();
    }
  }

  irCompra(card) {
    this.navCtrl.navigateForward(["crearcompra/", card.idProv]);
  }

  irCompraDetallada(card) {
    this.FB.getPesajeCompra(card.idProv);
    this.navCtrl.navigateForward(["cardcompradetallada/", card.idProv]);
  }

  async opciones() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que deseas hacer?',
      cssClass: 'my-custom-class',
      mode: 'md',
      buttons: [{
        text: 'Agregar proveedor',
        icon: 'person-add',
        handler: () => {
          this.input = { data: [] };
          this.listaProveedores = [];
          this.FB.proveedoresLista.forEach(element => {
            let provee = element;
            this.input.data.push({ name: provee.nombre, type: 'radio', label: provee.nombre, value: provee.id });
          });
          this.alertProveedores();

          // var elemento = document.getElementById("select-alert");
          // elemento.click();
        }
      },
      // {
      //   text: 'Distribuir pesos',
      //   icon: 'podium',
      //   handler: () => {
      //           //   }
      // },
      {
        text: 'Quitar compra',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  async alertProveedores() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Proveedores',
      inputs: this.input.data,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.navCtrl.navigateForward(["crearcompra/", value]);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertConfirmarNuevoLote() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "El ultimo lote no coincide con la fecha actual",
      subHeader: this.loteActual,
      message: '¿Desea crear un nuevo lote?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.FB.generarLote();
            this.loteActual = (this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1));
          }
        }
      ]
    });

    await alert.present();
  }
}

