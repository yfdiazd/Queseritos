import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService } from 'src/app/fbservices.service';
import { AlertController } from '@ionic/angular';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { element, Key } from 'protractor';
import { Console } from 'console';

@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {

  pesoacumulado = 200;
  saldodebitototal = 120000000;
  saldocreditotal = 140000000;



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

  loteActual: any;

  pesoMostrar = 0;
  bultosMostrar = 0;

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController

  ) {

    this.loteActual = (this.FB.ultimoLote.slice(this.FB.ultimoLote.length - 1));
    console.log("LOTE ULTIMO:   ", this.loteActual.toString());
    console.log("FECHA ACTUAL ----", this.FB.fechaActual())
    if (this.loteActual.toString().includes(this.FB.fechaActual())) {
      console.log("Si es el mismo")
    } else {
      this.alertConfirmarNuevoLote();
    }

  }
  test: any[];

  ngOnInit() {
    this.FB.getProveedorCompra();
    this.FB.getAnticipoProveedor();

    this.listaCards();

  }
  objImp: any;
  onbjAnt: any;
  listaCards() {
    console.log("asdasdasdasdasd ", this.FB.proveedorCompraLiata);
    console.log("Helppppppppp ", this.FB.anticipoCompraLista);
    this.FB.proveedorCompraLiata.forEach(element => {
      let total = 0;
      let totalCosto = 0;
      let totalBultos = 0;
      let keys = Object.keys(element);
      let lotes = element[keys[0]].idProveedor;
      keys.forEach(key => {
        total += element[key].pesoBultos;
        totalBultos += element[key].totalBulto;
        totalCosto += element[key].costoTotalCompra;

      });

      this.objImp = ({
        idProvedor: lotes,
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
      });
      this.onbjAnt = ({
        valorAnt: totalAnt,
        idProvee: prov
      });
      this.listaAnt.push(this.onbjAnt);
    });



    console.log("asdasdasdasdasd -*-*-*-*-*-*-*-*-*-", this.listaCard);
    console.log("---------------- -*-*-*-*-*-*-*-*-*-", this.listaAnt);
    this.metodoque();
    return this.listaCard, this.listaAnt;

  }
  listaPaVer: any[];
  obtPa: any;
  metodoque() {
    this.listaPaVer = [];
    this.listaCard.forEach(element => {
      this.listaAnt.forEach(element2 => {
        if (element.idProvedor === element2.idProvee) {
          this.obtPa = ({
            idProvedor: element.idProvedor,
            bultos: element.bultos,
            costo: element.costo,
            peso: element.peso,
            debito: element2.valorAnt
          });
          this.listaPaVer.push(this.obtPa);
        } else if (!this.listaPaVer.filter(valor => {
          return valor.idProvedor === element.idProvedor;

        })) {
          this.obtPa = ({
            idProvedor: element.idProvedor,
            bultos: element.bultos,
            costo: element.costo,
            peso: element.peso,
            debito: 0
          });
          this.listaPaVer.push(this.obtPa);
        }
      });

    });
    console.log("*----------------------------- ", this.listaPaVer);
    return this.listaPaVer;
  }

  listaAnticipo() {

  }

  irVender() {
    this.router.navigate(["cardcompras"]);
  }

  irPesajeCompra(card) {
    // this.FB.getNumBultos(card.id);
    this.navCtrl.navigateForward(["crearpesajecompra"]);

  }

  irCompraDetallada(card) {
    this.FB.getPesajeCompra(card.idProvedor);
    this.navCtrl.navigateForward(["cardcompradetallada/", card.idProvedor]);
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

