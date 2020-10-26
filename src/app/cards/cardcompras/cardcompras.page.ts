
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { element } from 'protractor';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {

  pesoacumulado = 0;
  saldodebitototal = 0;
  saldocreditotal = 0;



  public proveedor;
  public listaProveedores: any[];
  public input = { data: [] };
  public idProv;
  public nombres = [];

  //Esta lista va a obtener todas las compras existentes
  listaAllCompras: any[] = [];
  //Esta lista va a guardar las compras de un mismo proveedor
  listaProvNoRepetidos: any[] = [];
  //Lista de idproveedores
  listaIdProveedores: any[] = [];
  // Lista de nombres
  listaNombres: any[] = [];
  //Datos para mostrar en el card
  dataCard: any[] = [];
  //Datos consolidados para la visualización
  listaCard: any[] = [];
  listaAnt: any[] = [];
  //Variable donde se guarda el lote actual en el que se esta comprando
  loteActual: any;
  //Lista de nombres a mostrar
  public nombreProv: any;

  objImp: any;
  onbjAnt: any;
  listaPaVer: any;
  obtPa: any;

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController

  ) { }

  ngOnInit() {
    // this.validacionLote();
    this.listaCards();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.listaCards();
    this.listaAnt = [];
    this.listaCard = [];
    this.objImp = [];
    this.saldocreditotal = 0;
    this.pesoacumulado = 0;
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  traerNombre() {
    this.nombreProv = [];
    this.FB.proveedoresLista.forEach(element => {
      this.listaPaVer.forEach(element2 => {
        if (element.id == element2.idProveedor) {
          this.nombreProv.push({ nombre: element.nombre, idProv: element.id });
        }
      })
    })
    console.log("Nombres de los proveedores:", this.nombreProv);
  }

  validacionLote() {
    this.loteActual = (this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1));
    console.log("Lote actual", this.loteActual)
    console.log("LOTE ULTIMO:   ", this.loteActual.toString());
    console.log("FECHA ACTUAL ----", this.FB.fechaActual())
    if (this.loteActual.toString().includes(this.FB.fechaActual())) {
      console.log("Si es el mismo")
    } else {
      this.alertConfirmarNuevoLote();
    }
  }

  listaCards() {
    this.objImp = [];
    this.onbjAnt = [];
    this.listaCard = [];
    this.listaAnt = [];
    this.saldocreditotal = 0;
    this.pesoacumulado = 0;
    this.saldodebitototal = 0;
    console.log("Lista de provedores con compra", this.FB.proveedorCompraLista);
    console.log("Lista anticipos ", this.FB.anticipoCompraLista);
    this.FB.proveedorCompraLista.forEach(element => {
      let total = 0;
      let totalCosto = 0;
      let totalBultos = 0;
      let keys = Object.keys(element);
      let lotes = element[keys[0]].idProveedor;
      keys.forEach(key => {
        total += element[key].pesoBultos;
        totalBultos += element[key].totalBulto;
        totalCosto += element[key].costoTotalCompra;
        this.pesoacumulado += element[key].pesoBultos;
        this.saldocreditotal += element[key].costoTotalCompra;
      });

      this.objImp = ({
        idProveedor: lotes,
        bultos: totalBultos,
        costo: totalCosto,
        peso: total
      });
      this.listaCard.push(this.objImp);
    });
    this.FB.anticipoCompraLista.forEach(element => {
      let totalAnt: number = 0;
      let keys = Object.keys(element);
      let prov = element[keys[0]].idProveedor;
      keys.forEach(key => {
        totalAnt += element[key].valorAnticipo;
        this.saldodebitototal += element[key].valorAnticipo;
      });
      this.onbjAnt = ({
        valorAnt: totalAnt,
        idProvee: prov
      });
      this.listaAnt.push(this.onbjAnt);
    });
    console.log("asdasdasdasdasd -*-*-*-*-*-*-*-*-*-", this.listaCard);
    console.log("---------------- -*-*-*-*-*-*-*-*-*-", this.listaAnt);
    this.recorreListas();
    return this.listaCard, this.listaAnt, this.pesoacumulado, this.saldocreditotal, this.saldodebitototal;

  }

  recorreListas() {
    this.listaPaVer = [];
    if (this.listaAnt.length != 0) {
      console.log("siii diferente a 0000 ", this.listaAnt.length);
      this.listaCard.forEach(element => {
        this.listaAnt.forEach(element2 => {
          if (element.idProveedor == element2.idProvee) {
            this.obtPa = ({
              idProveedor: element.idProveedor,
              bultos: element.bultos,
              costo: element.costo,
              peso: element.peso,
              debito: element2.valorAnt
            });
            this.listaPaVer.push(this.obtPa);
            this.obtPa = null;
          } else if (this.listaPaVer.filter(valor => {
            return valor.idProveedor == element.idProveedor;
          }).length == 0 && this.listaAnt.filter(valorF => {
            return valorF.idProvee == element.idProveedor
          }).length == 0) {
            console.log("llego vaciooo ");
            this.obtPa = ({
              idProveedor: element.idProveedor,
              bultos: element.bultos,
              costo: element.costo,
              peso: element.peso,
              debito: 0
            });
            this.listaPaVer.push(this.obtPa);
            this.obtPa = null;
          }
        });
      });
    } else {
      this.listaCard.forEach(elementC => {
        this.obtPa = ({
          idProveedor: elementC.idProveedor,
          bultos: elementC.bultos,
          costo: elementC.costo,
          peso: elementC.peso,
          debito: 0
        });
        this.listaPaVer.push(this.obtPa);
        this.obtPa = null;
      });
    }
    console.log("*----------------------------- ", this.listaPaVer);
    return this.listaPaVer;
  }

  irCompra(card){
    this.navCtrl.navigateForward(["crearcompra/", card.idProveedor]);
    console.log("card.idProveedor", card.idProveedor)
  }

  irVender() {
    this.router.navigate(["cardcompras"]);
  }

  irPesajeCompra(card) {
    // this.FB.getNumBultos(card.id);
    this.navCtrl.navigateForward(["crearcompra/", card.idProveedor]);

  }

  irCompraDetallada(card) {
    this.FB.getPesajeCompra(card.idProveedor);
    this.navCtrl.navigateForward(["cardcompradetallada/", card.idProveedor]);
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
      }, {
        text: 'Distribuir pesos',
        icon: 'podium',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Quitar compra',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
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
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            console.log('Se envia el id del proveedor: ', value);
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
      header: 'El ultimo lote no coincide con la fecha actual',
      message: '¿Desea crear un nuevo lote?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Mantiene el lote actual', this.loteActual.toString());

          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.FB.generarLote();
            this.loteActual = (this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1));

            console.log("El nuevo lote ha sido creado", this.loteActual.toString());

          }
        }
      ]
    });

    await alert.present();
  }





}

