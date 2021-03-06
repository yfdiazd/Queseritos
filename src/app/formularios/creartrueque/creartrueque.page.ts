import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { FBservicesService } from '../../fbservices.service';




@Component({
  selector: 'app-creartrueque',
  templateUrl: './creartrueque.page.html',
  styleUrls: ['./creartrueque.page.scss'],
})
export class CreartruequePage implements OnInit {
  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  cantidad: string;

  // ----------------VARIABLES-------------
  tipoAnticipoEdit: any;
  valor: any;
  selectedFile: File;
  public idCompraRecibida: any;
  public nombreProv: any;
  //   @Pipe({
  //     name: 'thousandsPipe'
  // })

  //--------------------------------------
  // Esta variable es cuando viene de detalle lote
  @Input() datos: any = [];
  // esta es la variable de cuando viene de carlotes
  @Input() idProveedor;
  @Input() id;
  @Input() lote;
  @Input() card;


  ngOnInit() {
    this.traerNombre();
  }

  separador(event) {
    var separador = event;
    console.log("imprime separador", separador)
    separador.addEventListener('keyup', (e) => {
      console.log("muestro la entrada del campo valor ", entrada);
      var entrada = e.target.value.split('.').join('');
      entrada = entrada.split('').reverse();
      var salida = [];
      var aux = '';
      console.log("muestro la entrada del campo valor ", entrada);
      var paginador = Math.ceil(entrada.lenght / 3);
      console.log("muestro la paginación ", paginador);
      for (let i = 0; i < paginador; i++) {
        for (let j = 0; j < 3; j++) {
          if (entrada[j + (i * 3)] != undefined) {
            aux += entrada[j + (i * 3)];

          }
        }
        salida.push(aux);
        console.log("muestro la paginación ", aux);
        aux = '';
        e.target.value = salida.join('.').split("").reverse().join('')
      }

    }, false);
  }

  traerNombre() {
    this.nombreProv = [];
    if (this.card == "si") {
      this.FB.proveedoresLista.forEach(element => {
        if (element.id == this.idProveedor) {
          this.nombreProv = element.nombre;
        }
      });
    } else {
      this.FB.proveedoresLista.forEach(element => {
        if (element.id == this.datos.idProveedor) {
          this.nombreProv = element.nombre;
        }
      });
    }
  }

  imagen: any;
  nombreArchLoaded: string = "Subir Archivo";
  subirImg(event) {
    let valida = event.target.files[0].type;
    console.log("Fotoo ", valida);
    if (valida.includes("image")) {
      this.imagen = event;
      this.nombreArchLoaded = (this.imagen.target.files[0].name + " fue cargado 100%");
      return this.imagen, this.nombreArchLoaded;
    } else {
      this.FB.toastArchivoImagen();
    }

  }


  guardar() {


    console.log(" esto es ", this.card);
    if (this.card == "si") {
      if (this.idProveedor == null || this.id, this.lote == null || this.tipoAnticipoEdit == null || this.valor == null || this.imagen == undefined) {
        this.FB.toastCamposBlanco();
      }
      console.log("Cuando viene sin compra pepaa ", this.idProveedor, this.id, this.lote);
      this.FB.crearBalanceLote(this.idProveedor, this.lote);
      this.FB.registrarAnticiposApesajeCompra(this.idProveedor, this.id, this.lote, this.tipoAnticipoEdit, this.valor, this.imagen);
      this.FB.getPesajeLoteProveedor(this.idProveedor, this.lote);
      this.FB.getAnticipoDirectoProveedor(this.idProveedor, this.lote);
      this.modalCtrl.dismiss("true", "actualizar");
    } else {
      if (this.datos.idProveedor == null || this.datos.id == null || this.datos.lote == null || this.tipoAnticipoEdit == null || this.valor == null || this.imagen == undefined) {
        this.FB.toastCamposBlanco();
      }
      console.log("Cuando viene de detalles pape  ", this.datos);
      this.FB.crearBalanceLote(this.datos.idProveedor, this.datos.lote);
      this.FB.registrarAnticiposApesajeCompra(this.datos.idProveedor, this.datos.id, this.datos.lote, this.tipoAnticipoEdit, this.valor, this.imagen);
      this.FB.getPesajeLoteProveedor(this.datos.idProveedor, this.datos.lote);
      this.FB.getAnticipoDirectoProveedor(this.datos.idProveedor, this.datos.lote);
      this.modalCtrl.dismiss("true", "actualizar");
    }
  }

  volver() {
    this.modalCtrl.dismiss();
  }

  async toastCamposRequeridos() {
    const toast = await this.toastController.create({
      message: "Falta diligenciar campos requeridos.",
      cssClass: "toast",
      color: 'warning',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }


}



