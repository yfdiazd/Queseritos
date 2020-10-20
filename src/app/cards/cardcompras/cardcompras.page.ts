import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService } from 'src/app/fbservices.service';
import { AlertController } from '@ionic/angular';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { element } from 'protractor';
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
    console.log("FECHA ACTUAL ----",this.FB.fechaActual())
    if(this.loteActual.toString().includes(this.FB.fechaActual())){
      console.log("Si es el mismo")
    }else{

      this.presentAlertRadio2();
    }
    this.FB.getCompras();
    this.obtenerProveedoresRepetidos();
  }


  ngOnInit() {

  }
  obtenerProveedoresRepetidos() {
    //Esta lista va a guardar las compras de un mismo proveedor
    this.listaProvNoRepetidos = [];
    //Lista de idproveedores
    this.listaIdProveedores = [];
    // Lista de nombres
    this.listaNombres = [];
    //data recopilada en una lista de los proveedores con sus datos
    this.dataCard = [];
    //Data que se va a ver en el car
    this.listaCard = [];
    this.FB.getCompras();


    this.FB.listaCompras.forEach(element => {
      this.listaIdProveedores.push(element.idProveedor);
    })
    console.log("Esto es la lista de IDS: ", this.listaIdProveedores);


    //Este coso guiarda en un array "uniqs" provedores sin repetirse.
    var uniqs = this.listaIdProveedores.filter(function (item, index, array) {
      return array.indexOf(item) === index;
    })
    this.listaProvNoRepetidos = uniqs;
    console.log("Esto es la lista proveedores sin repetirse: ", this.listaProvNoRepetidos);


    //----------------Esto es para traer el nombre del proveedor por ID ------------

    this.FB.proveedoresLista.forEach(element => {
      this.listaProvNoRepetidos.forEach(element2 => {
        if (element.id == element2) {
          this.listaNombres.push({ nombre: element.nombre, id: element2 })
          console.log("Este es el nombre ", element.nombre, " de el id: ", element2);
        }
      })
    })

    //----------------Esto es para traer el nombre del proveedor por ID ------------

    this.FB.listaCompras.forEach(element => {
      this.listaProvNoRepetidos.forEach(element2 => {
        if (element.idProveedor == element2) {
          this.dataCard.push({
            id: element2,
            peso: element.pesoBultos,
            bultos: element.totalBulto,
            costo: element.costoTotalCompra
          })
        }
      })
    })
    console.log("Esto es lo que se mostrará en la card", this.dataCard);
    /*------------------------Falata terminar este metodo--- 
      Lo que hace este es sumar (costo, peso, ° bultos) de cada pesaje y 
      sumarlo en una variable para mostrarlo en el card del HTML
    */
    this.listaProvNoRepetidos.forEach(element => {
      this.dataCard.forEach(element2 => {
        if (element == element2.id) {
          this.pesoMostrar = this.pesoMostrar + element2.peso;
          this.bultosMostrar = this.bultosMostrar + element2.bultos;

          this.listaCard.push({ id: element2.id, peso: this.pesoMostrar, bultos: this.bultosMostrar, costo: element.costoTotalCompra })
        }
      })
    })

    console.log("Esto es el peso actual", this.pesoMostrar);
    console.log("Esto es la data final----", this.listaCard);

  }




  irVender() {
    this.router.navigate(["cardcompras"]);
  }

  irPesajeCompra(card) {
    // this.FB.getNumBultos(card.id);
    this.navCtrl.navigateForward(["crearpesajecompra/", card.id]);
    console.log("ID:", card.id)
  }

  irCompraDetallada() {
    this.navCtrl.navigateForward(["cardcompradetallada"]);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que deseas hacer?',
      cssClass: 'my-custom-class',
      mode: 'md',
      buttons: [{
        text: 'Agregar proveedor',
        icon: 'person-add',
        handler: () => {
          // this.presentAlertRadio();
          this.input = { data: [] };
          this.listaProveedores = [];
          console.log("this.listaProveedores: ", this.listaProveedores)
          this.FB.proveedoresLista.forEach(element => {
            let provee = element;
            this.input.data.push({ name: provee.nombre, type: 'radio', label: provee.nombre, value: provee.id });
          });
          console.log("Se obtuvo esto_:", this.input);
          this.presentAlertRadio();

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

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
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
            this.navCtrl.navigateForward(["crearpesajecompra/", value]);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadio2() {
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

